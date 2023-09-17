import { Document, Model, model, models, ObjectId, Schema } from 'mongoose'
import { JobDocument } from './Job'
import { UserDocument } from './User'

export interface CommentDocument extends Document {
	author: UserDocument['username'],
	job: JobDocument['_id']
	content: string
	mentions: [UserDocument['_id']]
	createdAt: Date
}

const commentSchema = new Schema<CommentDocument>({
	author: { type: String, required: true },
	job: { type: Schema.Types.ObjectId, required: true },
	content: { type: String, required: true },
	mentions: { type: [Schema.Types.ObjectId], default: []},
	createdAt: { type: Date, default: new Date() },
})

const Comment = models?.Comment || model('Comment', commentSchema)
export default Comment as Model<CommentDocument>
