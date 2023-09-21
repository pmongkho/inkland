import { Document, Model, model, models, Schema } from 'mongoose'
import { JobDocument } from './Job'
import { UserDocument } from './User'

export interface BuyerSellerChatDocument extends Document {
	participants: [UserDocument['_id']]
	job: JobDocument['_id']
	messages: [
		{
			sender: UserDocument['_id']
			content: String
			createdAt: Date
		},
	]
}

const buyerSellerChatSchema = new Schema<BuyerSellerChatDocument>({
	participants: [{ type: Schema.Types.ObjectId, required: true, ref: 'User' }],
	job: { type: Schema.Types.ObjectId, required: true, ref: 'Job' },
	messages: [
		{
			sender: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
			content: { type: String, required: true },
			createdAt: { type: Date, default: Date.now },
		},
	],
})

const BuyerSellerChat =
	models?.BuyerSellerChat || model('BuyerSellerChat', buyerSellerChatSchema)
export default BuyerSellerChat as Model<BuyerSellerChatDocument>
