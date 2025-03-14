import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '@/_lib/mongodb'
import User, {UserDocument} from '@/_models/User'
import { generateUsername } from '@/_lib/genUserName'
import { AdapterUser } from 'next-auth/adapters' // ✅ Import AdapterUser type
import startDb from './db'

export function CustomMongoDBAdapter(clientPromise: any) {
	const baseAdapter = MongoDBAdapter(clientPromise)

	return {
		...baseAdapter,

		async createUser(user: AdapterUser) {
			    console.log('🟢 Creating user with:', user)

			// ✅ Explicitly type user
			await startDb()
			const existingUser = await User.findOne({ 'profile.email': user.email })

			if (existingUser) {
				return existingUser // Return existing user if found
			}

			// ✅ Create a user using your custom schema
			const newUser:UserDocument = await User.create({
				username: generateUsername(),
				role: 'BLANK',
				profile: {
					name: user.name,
					email: user.email,
					image: user.image,
					zipcode: '00000',
					bio: 'Please fill out your bio',
				},
				jobs: [],
				followers: [],
				following: [],
				publicChats: [],
				buyerSellerChats: [],
				saved: [],
				tagged: [],
				completed: [],
			})
    console.log('✅ New user created:', newUser)
			return newUser // Return user with full schema
		},
	}
}
