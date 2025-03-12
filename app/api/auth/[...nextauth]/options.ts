// In your NextAuth configuration file
import startDb from '@/_lib/db'
import User from '@/_models/User'
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import EmailProvider from 'next-auth/providers/email'
import {MongoDBAdapter} from '@next-auth/mongodb-adapter'
import clientPromise from "@/_lib/mongodb"  // Your MongoDB connection
import {Resend} from 'resend'
import {ObjectId} from 'mongoose'


const resend = new Resend(process.env.RESEND_API_KEY)

export const authOptions: NextAuthOptions = {
	adapter: MongoDBAdapter(clientPromise), // Add MongoDB Adapter ✅
	// adapter:undefined,
	pages: {
		signIn: '/login',
	},
	session: {
		strategy: 'jwt',
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID as string,
			clientSecret: process.env.GOOGLE_SECRET as string,
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code',
				},
			},
		}),
		// Magic Link (Email Provider)
		EmailProvider({
			// Override sendVerificationRequest to use Resend and your custom token logic
			async sendVerificationRequest({ identifier: email, url }) {
				// Send the email using Resend
				await resend.emails.send({
					from: process.env.EMAIL_FROM as string,
					to: email,
					subject: 'Sign in to Inkland',
					html: `<p>Click <a href="${url}">here</a> to sign in. This link expires in 30 minutes.</p>`,
					text: `Sign in using the following link: ${url}`,
				})
			},
		}),

		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'email', type: 'text', placeholder: 'email' },
				name: { label: 'name', type: 'text', placeholder: 'name' },
				image: { label: 'image', type: 'text', placeholder: 'image' },
				id: { label: 'id', type: 'text', placeholder: 'id' },
				username: { label: 'username', type: 'text', placeholder: 'username' },
				role: { label: 'role', type: 'text', placeholder: 'role' },
				zipcode: { label: 'zipcode', type: 'text', placeholder: 'zipcode' },
			},
			async authorize(credentials, req) {
				await startDb()
				const user: any = await User.findOne({
					'profile.email': credentials?.email,
				})
				// Return the user if found, otherwise return null.
				return user ? user : null
			},
		}),
	],
	callbacks: {
		async signIn({ user, account }) {
			// Only modify for email sign-in
			if (account?.provider === 'email') {
				// Example: update the user record with default fields if they are missing
				await User.updateOne(
					{ email: user.email },
					{
						$setOnInsert: {
							// Insert these fields only when the user is created for the first time
							role: 'CLIENT', // default role for email sign-in users
							username: user.email?.split('@')[0],
							name: user.email?.split('@')[0],	//*create funny names generate
							image:
								'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fdefault-profile-picture&psig=AOvVaw0RgK0gLA0t9ehqY1OX0R6T&ust=1741841913693000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCIiW1vfgg4wDFQAAAAAdAAAAABAE',
							zipcode: '00000', // default zipcode for email sign-in users
							// Add any additional default fields here
							// You can add any additional default fields here
						},
					},
					{ upsert: true }
				)
			}
			return true
		},
		async jwt({ token, user }) {
			// ✅ If a new user is signing in, store their details in the token
			if (user) {
				token.id = user.id?.toString() ?? ''
				token.role = user.role
				token.email = user.email // Ensure email is stored for magic links
			}
			return token
		},
		async session({ session, token }) {
			session.user.id = token.id as ObjectId
			session.user.role = token.role
			session.user.email = token.email as string
			return session
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
}
