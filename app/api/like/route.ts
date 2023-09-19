import Job from '@/_models/Job'
import UserModel from '@/_models/User'
import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
	const body = await req.json()
	try {
        const job = await Job.findById(body.jobId)
		if (job?.likes.includes(body.sessionUserId)) {
			await Promise.all([
				UserModel.findOneAndUpdate(
					{ _id: body.userId },
					{ $pull: { saved: body.jobId } }
				),
				Job.findOneAndUpdate(
					{ _id: body.jobId },
					{ $pull: { likes: body.sessionUserId } }
				),
			])
		} else {
			await Promise.all([
				UserModel.findOneAndUpdate(
					{ _id: body.sessionUserId },
					{ $push: { saved: body.jobId } }
				),
				Job.findOneAndUpdate(
					{ _id: body.jobId },
					{ $push: { likes: body.sessionUserId } }
				),
			])
		}
		revalidateTag('jobs')
		return NextResponse.json({ status: 201 })
	} catch (error) {
		throw error
	}
}


// export const likeJob = async (req: any) => {
// 	try {
		
// 	} catch (error) {
// 		throw error
// 	}
// }