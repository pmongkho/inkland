import { ObjectId } from 'mongoose';
import {DefaultSession, DefaultUser} from 'next-auth';
import {JWT, DefaultJWT} from 'next-auth/jwt'



declare module 'next-auth' {

// export interface DefaultSession {
// 	user?: {
// 		name?: string | null
// 		email?: string | null
// 		image?: string | null
// 	}
// 	expires: ISODateString
// }
    interface Session{
        user: {
            id: ObjectId| Request,
            username: string,
            role: string,
            email: string,
            name: string,
            image: string,
            phone: string,
            zipcode: string
        } & DefaultSession
    }

// export interface DefaultUser {
// 	id: string
// 	name?: string | null
// 	email?: string | null
// 	image?: string | null
// }
    interface User extends DefaultUser {
			id: string
			role: string
			username: string
			zipcode: string
		}
}

// export interface DefaultJWT extends Record<string, unknown> {
// 	name?: string | null
// 	email?: string | null
// 	picture?: string | null
// 	sub?: string
// }
declare module 'next-auth/jwt' {
    interface JWT extends DefaultJWT {
			role: string
			phone: string
			zipcode: string
		}
}