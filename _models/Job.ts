import mongoose, {
	Document,
	Model,
	model,
	models,
	ObjectId,
	Schema,
} from 'mongoose'
import { UserDocument } from './User'

enum StatusEnum {
	PENDING = 'PENDING',
	AVAILABLE = 'AVAILABLE',
	COMPLETED = 'COMPLETED',
}

export interface JobDocument extends Document {
	author: ObjectId
	tattoo: {
		subjectMatter: string
		style: string
		placement: string
		photos: {
			fileUrl: string
			fileKey: string
		}[]
		addlInfo: string
		price: number
		duration: string
	}
	likes: [ObjectId]
	comments: [ObjectId]
	createdAt: Date
	updatedAt: Date
	status: StatusEnum
}
const jobSchema = new Schema<JobDocument>({
	author: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
	tattoo: {
		subjectMatter: { type: String, required: true },
		style: { type: String, required: true },
		placement: { type: String, required: true },
		photos: { type: Array, required: true },
		addlInfo: { type: String, default: 'Nothing' },
		price: { type: Number, default: 0 },
		duration: { type: String, default: 'Any' },
	},
	likes: [{ type: Schema.Types.ObjectId, default: [], ref: 'User' }],
	comments: [{ type: Schema.Types.ObjectId, default: [], ref: 'Comment' }],
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
	status: {
		type: String,
		enum: Object.values(StatusEnum),
		default: StatusEnum.AVAILABLE,
	},
})

const Job = mongoose.models?.Job || mongoose.model('Job', jobSchema)
export default Job as Model<JobDocument>
