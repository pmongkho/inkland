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
		}
	] //user and other user
	completed: [TransactionDocument['_id']] //Ref to Transaction involving user
}

const userSchema = new Schema<UserDocument>({
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
		},
		email: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
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
	jobs: { type: [Schema.Types.ObjectId], default: [] },
	followers: { type: [Schema.Types.ObjectId], default: [] },
	following: { type: [Schema.Types.ObjectId], default: [] },
	publicChats: { type: [Schema.Types.ObjectId], default: [] },
	buyerSellerChats: { type: [Schema.Types.ObjectId], default: [] },
	saved: { type: [Schema.Types.ObjectId], default: [] },
	tagged: [
		{
			user: { type: Schema.Types.ObjectId, required: true },
			post: { type: Schema.Types.ObjectId, required: true },
		},
	],
	completed: { type: [Schema.Types.ObjectId], default: [] },
})

const User = models?.User || model('User', userSchema)
export default User as Model<UserDocument>
