import startDb from '@/_lib/db'
import ConsultationModel, { ConsultationDocument } from '@/_models/consultationModel'
import LikeModel from '@/_models/likeModel'
import { ObjectId } from 'mongoose'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
	const body = await req.json()
	await startDb()
	const consultation = await ConsultationModel.create({ ...body })
	return NextResponse.json({ consultation })
}
export const getConsultationByUser = async (
	id: Request | string | undefined
) => {
	await startDb()
	const consultation = await ConsultationModel.find({ user_id: id })
	return consultation
}

export const getAllConsultationsSortedDate = async () => {
	await startDb()
    const consultation = await ConsultationModel.find().sort({ date: -1 })
    return consultation
}

// debug!!!!
export const getAllConsultationsUserLiked = async (
	user_id: ObjectId|Request|undefined
) => {
	await startDb()
	const [likes, consultations] = await Promise.all([ LikeModel.find({ user_id: user_id }), ConsultationModel.find()])

	var likedConsultations: any[] = []

	consultations.map((item) => {
		likes.map((i) => {
			if (item._id.toString() === i.consultation_id.toString()) {
				likedConsultations.push(item)
			}
		})
	})
	return likedConsultations
}
