import { Document, Model, model, models, Schema } from 'mongoose'
import { JobDocument } from './Job'
import { UserDocument } from './User'

enum StatusEnum {
	PENDING = 'PENDING',
	COMPLETED = 'COMPLETED',
}

export interface TransactionDocument extends Document {
	clientId: UserDocument['_id']
	artistId: UserDocument['_id']
	jobId: JobDocument['_id']
	amount: Number
	status: StatusEnum
	createdAt: Date
	paymentMethod: String
	purchasedAt: Date
}

const transactionSchema = new Schema<TransactionDocument>({
	clientId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
	artistId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
	jobId: { type: Schema.Types.ObjectId, required: true, ref: 'Job' },
	amount: { type: Number, required: true },
	status: { type: String, enum: Object.values(StatusEnum), required: true },
	createdAt: { type: Date, default: Date.now },
	paymentMethod: { type: String, required: true },
	purchasedAt: { type: Date, default: Date.now },
})

const Transaction =
	models?.Transaction || model('Transaction', transactionSchema)
export default Transaction as Model<TransactionDocument>
