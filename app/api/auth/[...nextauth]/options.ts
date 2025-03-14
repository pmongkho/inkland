// In your NextAuth configuration file
import startDb from '@/_lib/db'
import User, {UserDocument} from '@/_models/User'
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import EmailProvider from 'next-auth/providers/email'
import { CustomMongoDBAdapter } from '@/_lib/customMongoDBAdapter'
import clientPromise from '@/_lib/mongodb' // Your MongoDB connection
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const authOptions: NextAuthOptions = {
	adapter: CustomMongoDBAdapter(clientPromise), // Add MongoDB Adapter ✅
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
					scope: 'openid email profile', // 🔥 Ensure email scope is included

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

		// CredentialsProvider({
		// 	name: 'Credentials',
		// 	credentials: {
		// 		email: { label: 'email', type: 'text', placeholder: 'email' },
		// 		name: { label: 'name', type: 'text', placeholder: 'name' },
		// 		image: { label: 'image', type: 'text', placeholder: 'image' },
		// 		id: { label: 'id', type: 'text', placeholder: 'id' },
		// 		username: { label: 'username', type: 'text', placeholder: 'username' },
		// 		role: { label: 'role', type: 'text', placeholder: 'role' },
		// 		zipcode: { label: 'zipcode', type: 'text', placeholder: 'zipcode' },
		// 	},
		// 	async authorize(credentials, req) {
		// 		await startDb()
		// 		const user: any = await User.findOne({
		// 			'profile.email': credentials?.email,
		// 		})
		// 		// Return the user if found, otherwise return null.
		// 		return user ? user : null
		// 	},
		// }),
	],
	callbacks: {
		async jwt({ token, user }) {
			console.log('🟢 User during JWT creation:', user)

			await startDb()

			// ✅ If a new user is signing in, set initial token fields
   if (user) {
			token.id = user.id
			token.role = user.role
			token.email = user.profile?.email || user.email || 'MISSING_EMAIL' // ✅ Fix here
			token.username = user.username
			token.name = user.profile?.name || user.name
			token.image = user.profile?.image || user.image
			token.zipcode = user.profile?.zipcode || '00000' // Default value
		}

			// ✅ Always fetch latest user data from DB (to update role, username, etc.)
			console.log('🔍 Searching for user with token. email:', token.email)

			const updatedUser = await User.findOne({
				'profile.email': token.email,
			}).lean()

			console.log('jwtuser: ', updatedUser)
			if (updatedUser) {
				token.id = updatedUser._id.toString()
				token.role = updatedUser.role.toString()
				token.username = updatedUser.username.toString()
				token.zipcode = updatedUser.profile.zipcode.toString()
				token.name = updatedUser.profile.name.toString()
				token.image = updatedUser.profile.image.toString()
			}

			return token
		},

		async session({ session, token }) {
			console.log('🟢 Token inside session callback:', token)

			await startDb()
			// ✅ Always fetch latest user data before returning session
			const updatedUser = await User.findOne({
				'profile.email': token.email,
			}).lean()

			console.log('sessionuser: ', updatedUser)

			// ✅ Use token data (no DB call needed)
			session.user = {
				id: updatedUser?._id.toString() || '',
				role: updatedUser?.role || 'BLANK', // 🔥 Default value for role
				email: updatedUser?.profile.email || '', // 🔥 Ensure email is a string
				username: updatedUser?.username || '', // 🔥 Ensure username is a string
				name: updatedUser?.profile.name || '', // 🔥 Ensure name is a string
				image: updatedUser?.profile.image || '', // 🔥 Ensure image is a string
				zipcode: updatedUser?.profile.zipcode || '', // 🔥 Ensure zipcode is a string
			}

			return session
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
}
