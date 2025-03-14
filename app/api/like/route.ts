import Job from '@/_models/Job'
import UserModel from '@/_models/User'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
	const body = await req.json()

	try {
		const job = await Job.findById(body.jobId)
		let updatedLikes

		if (job?.likes.includes(body.sessionUserId)) {
			await Promise.all([
				UserModel.findOneAndUpdate(
					{ _id: body.sessionUserId },
					{ $pull: { saved: body.jobId } }
				),
				Job.findOneAndUpdate(
					{ _id: body.jobId },
					{ $pull: { likes: body.sessionUserId } }
				),
			])
			// ✅ Remove user from likes and return updated count
			updatedLikes = job.likes.filter(
				(id) => id.toString() !== body.sessionUserId
			).length
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
			// ✅ Increase likes count manually
			updatedLikes = (job?.likes?.length || 0) + 1
		}

		// ✅ Return updated like count instead of revalidating
		return NextResponse.json({ success: true, likes: updatedLikes })
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to update like', details: error },
			{ status: 500 }
		)
	}
}
