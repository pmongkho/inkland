import {ObjectId} from 'mongoose'
import { DefaultSession, DefaultUser } from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
	interface Session {
		user: {
			id: string | ObjectId // ✅ Ensure ID is always a string (avoid ObjectId mismatch)
			role: string
			email: string
			name: string
			username: string
			image: string
			zipcode: string
		} & DefaultSession['user']
	}

	interface User extends DefaultUser {
		id: string // ✅ Ensure ID is a string
		role: string
		zipcode: string
	}

	interface JWT {
		id: string // ✅ Ensure JWT `id` is also a string
		role: string
		email: string
		name?: string
		image?: string
	}
}
