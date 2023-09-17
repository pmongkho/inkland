import mongoose, { Document, Model, model, models, Schema } from 'mongoose'
import { UserDocument } from './userModel'

enum StatusEnum {
	PENDING = 'PENDING',
	AVAILABLE = 'AVAILABLE',
	COMPLETED = 'COMPLETED',
}

export interface JobDocument extends Document {
	author: UserDocument['_id']
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
	likes: [UserDocument['_id']]
	comments: [UserDocument['_id']]
	createdAt: Date
	updatedAt: Date
	status: StatusEnum
}
const jobSchema = new Schema<JobDocument>(
	{
		author: { type: Schema.Types.ObjectId, required: true },
		tattoo: {
			subjectMatter: { type: String, required: true },
			style: { type: String, required: true },
			placement: { type: String, required: true },
			photos: { type: Array, required: true },
			addlInfo: { type: String, default: 'Nothing' },
			price: { type: Number, default: 0 },
			duration: { type: String, default: 'Any' },
		},
		likes: { type: [Schema.Types.ObjectId], default: [] },
		comments: { type: [Schema.Types.ObjectId], default: [] },
		createdAt: { type: Date, default: new Date() },
		updatedAt: { type: Date, default: new Date() },
		status: {
			type: String,
			enum: Object.values(StatusEnum),
			default: StatusEnum.AVAILABLE,
		},
	}
)

const JobModel = models?.Job || model('Job', jobSchema)
export default JobModel as Model<JobDocument>
