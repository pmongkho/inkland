import { Document, Model, model, models, Schema } from 'mongoose'
import { UserDocument } from './User'

export interface PublicChatDocument extends Document {
	participants: [UserDocument['_id']]
    messages: [{
        sender: UserDocument['_id'],
        content: String,
        createdAt: Date
    }]
}

const publicChatSchema = new Schema<PublicChatDocument>({
	participants: [{ type: Schema.Types.ObjectId, required: true, ref: 'User' }],
	messages: [
		{
			sender: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
			content: { type: String, required: true },
			createdAt: { type: Date, default: Date.now() },
		},
	],
})

const PublicChat = models?.PublicChat || model('PublicChat', publicChatSchema)
export default PublicChat as Model<PublicChatDocument>
