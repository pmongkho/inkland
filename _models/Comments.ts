import { Document, Model, model, models, Schema } from 'mongoose'
import { JobDocument } from './Job'
import { UserDocument } from './User'

export interface CommentDocument extends Document {
	author: UserDocument,
	job: JobDocument['_id']
	content: string
	mentions: [UserDocument['_id']]
	createdAt: Date
}

const commentSchema = new Schema<CommentDocument>({
	author: { type: Schema.Types.ObjectId, required: true, ref:'User' },
	job: { type: Schema.Types.ObjectId, required: true, ref:'Job' },
	content: { type: String, required: true },
	mentions: [{ type: Schema.Types.ObjectId, default: [], ref:'User' }],
	createdAt: { type: Date, default: Date.now },
})

const Comment = models?.Comment || model('Comment', commentSchema)
export default Comment as Model<CommentDocument>
