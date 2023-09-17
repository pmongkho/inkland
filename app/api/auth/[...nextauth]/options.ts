import startDb from '@/_lib/db'
import User from '@/_models/User'
import { login } from '@/_redux/features/userSlice'
import { store } from '@/_redux/store'
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
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
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.role = user.role
				token.id = user.id
			}
			return token
		},
		async session({ session, token }) {
			await startDb()
			const sessionUser = await User.findOne({
				'profile.email': session.user.email,
			})
			if (session?.user) {
				session.user.id = sessionUser?._id
				session.user.username = sessionUser?.username as string
				session.user.role = sessionUser?.role as string
				session.user.zipcode = sessionUser?.profile.zipcode as string
			}
			store.dispatch(login(sessionUser))
			return session
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
}
