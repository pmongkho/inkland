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
		}
	]
}

const buyerSellerChatSchema = new Schema<BuyerSellerChatDocument>({
	participants: { type: [Schema.Types.ObjectId], required: true ,},
	job: { type: Schema.Types.ObjectId, required: true },
	messages: [
		{
			sender: { type: Schema.Types.ObjectId, required: true },
			content: { type: String, required: true },
			createdAt: { type: Date, default: new Date() },
		},
	],
})

const BuyerSellerChatModel =
	models?.BuyerSellerChat || model('BuyerSellerChat', buyerSellerChatSchema)
export default BuyerSellerChatModel as Model<BuyerSellerChatDocument>