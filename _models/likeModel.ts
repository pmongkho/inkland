import { Model, models, model } from 'mongoose'
import { Document, Schema } from 'mongoose'
import { ConsultationDocument } from './consultationModel'
import { UserDocument } from './userModel'

export interface LikeDocument extends Document {
	user_id: UserDocument['_id']
	consultation_id: ConsultationDocument['_id']
	liked: boolean
}

const likeSchema = new Schema<LikeDocument>({
	user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	consultation_id: { type: Schema.Types.ObjectId, ref: 'Consultation', required: true },
	liked: { type: Boolean},
})

const LikeModel = models?.Like || model('Like', likeSchema)
export default LikeModel as Model<LikeDocument>
