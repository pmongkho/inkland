import { Model, models, model } from 'mongoose'
import { Document, Schema, Types } from 'mongoose'
import { UserDocument } from './userModel'

export interface ConsultationDocument extends Document {
	style: string
	placement: string
	photos:
		| {
				fileUrl: string
				fileKey: string
		  }[]
		| undefined
	comments: string
	date: string
	user_id: UserDocument['_id']
}

const consultationSchema = new Schema<ConsultationDocument>({
	style: { type: String, required: true },
	placement: { type: String, required: true },
	photos: { type: Array, required: true },
	comments: { type: String },
	date: { type: String, required: true, unique: true },
    user_id: { type: Schema.Types.ObjectId, ref:'User', required: true },
})

const ConsultationModel =
	models?.Consultation || model('Consultation', consultationSchema)
export default ConsultationModel as Model<ConsultationDocument>
