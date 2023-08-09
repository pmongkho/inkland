import { ObjectId } from 'mongoose'
import { DefaultSession, DefaultUser } from 'next-auth'
import { JWT, DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
	interface Session {
		user: {
			id: ObjectId|Request
			userRole: string
			email: Request | string| undefined
			name: string
			image: string
			phone: string
			zipcode: string
		} & DefaultSession
	}

	interface User extends DefaultUser {
		userRole: string
		phone: string
		zipcode: string
	}
}

declare module 'next-auth/jwt' {
	interface JWT extends DefaultJWT {
		userRole: string
		phone: string
		zipcode: string
	}
}
