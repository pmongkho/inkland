import startDb from '@/_lib/db'
import User, { UserDocument } from '@/_models/User'
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'


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
		CredentialsProvider({
			// The name to display on the sign in form (e.g. 'Sign in with...')
			name: 'Credentials',
			// The credentials is used to generate a suitable form on the sign in page.
			// You can specify whatever fields you are expecting to be submitted.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
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
				// You need to provide your own logic here that takes the credentials
				// submitted and returns either a object representing a user or value
				// that is false/null if the credentials are invalid.
				// e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
				// You can also use the `req` object to obtain additional parameters
				// (i.e., the request IP address)
				await startDb()
				const user: any = await User.findOne({
					'profile.email': credentials?.email,
				})
				// If no error and we have user data, return it
				if (user) {
					user.email = 'Guest@gmail.com'
					user.name = 'Guesty Guest'
					user.image =
						'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg/v1/fill/w_300,h_300,q_75,strp/default_user_icon_4_by_karmaanddestiny_de7834s-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MzAwIiwicGF0aCI6IlwvZlwvMjcxZGVlYTgtZTI4Yy00MWEzLWFhZjUtMjkxM2Y1ZjQ4YmU2XC9kZTc4MzRzLTY1MTViZDQwLThiMmMtNGRjNi1hODQzLTVhYzFhOTVhOGI1NS5qcGciLCJ3aWR0aCI6Ijw9MzAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.W7L0Rf_YqFzX9yxDfKtIMFnnRFdjwCHxi7xeIISAHNM'
					user.id = '65138fcaa40bcf44b9577b42'
					user.username = 'Guest'
					user.role = 'CLIENT'
					user.zipcode = '66666'
					return user
				}
				// Return null if user data could not be retrieved
				return null
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
			return session
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
}
