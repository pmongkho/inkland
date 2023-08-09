import { Model, models, model } from 'mongoose'
import { Document, Schema } from 'mongoose'

export enum Roles {
	'admin',
	'artist',
	'user',
}

export interface UserDocument extends Document {
	email: string | undefined
	name: string | undefined
	image: string | undefined
	zipcode: string | undefined
	phone: string | undefined
	userRole: Roles | string | undefined
}

const userSchema = new Schema<UserDocument>({
	name: { type: String, required: true },
	email: {
		type: String,
		required: true,
	},
	image: { type: String, required: true },
	phone: { type: String, required: true },
	zipcode: { type: String, required: true },
	userRole: { type: String, required: true },
})

const UserModel = models?.User || model('User', userSchema)
export default UserModel as Model<UserDocument>
