import { ObjectId } from 'mongoose'
import { DefaultSession, DefaultUser } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import {EnumType} from 'typescript'

declare module 'next-auth' {
	interface User extends DefaultUser {
		emailVerified: Date | null
		id: string
		role: string
		username: string
		profile?: {
			name: string
			email: string
			image: string
			zipcode: string
		}
	}
	interface Session {
		user: {
			id: string // ✅ Ensure ID is always a string (avoid ObjectId mismatch)
			role: string
			email: string
			name: string
			username?: string | undefined
			image: string
			zipcode?: string
		} & DefaultSession['user']
	}

	interface User extends DefaultUser {
		role: string
		username?: string
		zipcode: string
	}

	interface JWT {
		id: string // Ensure JWT `id` is a string
		role: string
		email: string
		name?: string
		image?: string
		username?: string // ✅ Add username
		zipcode?: string // ✅ Add zipcode
	}
}
