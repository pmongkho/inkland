import startDb from '@/_lib/db'
import UserModel from '@/_models/userModel'
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'


export const authOptions: NextAuthOptions = {
	pages: {
		signIn: '/login',
		newUser: '/signup',
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
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.userRole = user.userRole
				token.id = user.id
			}
			return token
		},
		async session({ session, token }) {
			await startDb()
			const sessionUser = await UserModel.findOne({ email: session.user.email })
			if (session?.user) {
				session.user.id = sessionUser?._id
				session.user.userRole = sessionUser?.userRole as string
				session.user.zipcode = sessionUser?.zipcode as string
				session.user.phone = sessionUser?.phone as string
			}
			return session
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
}
