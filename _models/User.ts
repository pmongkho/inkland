import { Document, Model, model, models, Schema } from 'mongoose'
import { BuyerSellerChatDocument } from './BuyerSellerChat'
import { JobDocument } from './Job'
import { PublicChatDocument } from './PublicChat'
import { TransactionDocument } from './Transaction'

enum RoleEnum {
	ADMIN = 'ADMIN',
	ARTIST = 'ARTIST',
	CLIENT = 'CLIENT',
}

export interface UserDocument extends Document {
	emailVerified: Date
	username: string
	role: RoleEnum
	profile: {
		name: string
		email: string
		image: string
		zipcode: string
		bio: String
	}
	jobs: [JobDocument['_id']] //post created by user
	followers: [UserDocument['_id']] //followers of user
	following: [UserDocument['_id']] //following user
	saved: [JobDocument['_id']] //post object saved
	publicChats: [PublicChatDocument['_id']] //ref to chat id
	buyerSellerChats: [BuyerSellerChatDocument['_id']] //ref to chat id
	tagged: [
		{
			user: UserDocument['_id']
			post: JobDocument['_id']
		},
	] //user and other user
	completed: [TransactionDocument['_id']] //Ref to Transaction involving user
}

const userSchema = new Schema<UserDocument>({
	emailVerified: { type: Date, default: null },
	username: { type: String, required: true, unique: true },
	role: {
		type: String,
		enum: Object.values(RoleEnum),
		required: true,
	},
	profile: {
		name: {
			type: String,
			required: true,
			default: 'Anonymous',
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		image: {
			type: String,
			required: true,
			default:
				'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fdefault-profile-picture&psig=AOvVaw0RgK0gLA0t9ehqY1OX0R6T&ust=1741841913693000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCIiW1vfgg4wDFQAAAAAdAAAAABAE',
		},
		zipcode: {
			type: String,
			required: true,
		},
		bio: {
			type: String,
			default: 'Please fill out your bio',
		},
	},
	jobs: [{ type: Schema.Types.ObjectId, default: [], ref: 'Job' }],
	followers: [{ type: Schema.Types.ObjectId, default: [], ref: 'User' }],
	following: [{ type: Schema.Types.ObjectId, default: [], ref: 'User' }],
	publicChats: [
		{ type: Schema.Types.ObjectId, default: [], ref: 'PublicChat' },
	],
	buyerSellerChats: [
		{ type: Schema.Types.ObjectId, default: [], ref: 'BuyerSellerChat' },
	],
	saved: [{ type: Schema.Types.ObjectId, default: [], ref: 'Job' }],
	tagged: [
		{
			user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
			post: { type: Schema.Types.ObjectId, required: true, ref: 'Job' },
		},
	],
	completed: [{ type: Schema.Types.ObjectId, default: [], ref: 'Job' }],
})

const User = models?.User || model('User', userSchema)
export default User as Model<UserDocument>
