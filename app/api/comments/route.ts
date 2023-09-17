import startDb from '@/_lib/db'
import Comment from '@/_models/Comments'
import Job from '@/_models/Job'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
	await startDb()
	const body = await req.json()
	try {
		const comment = await Comment.create({
			...body,
		})

		const query = { _id: body.job }
		const update = { comments: comment._id }
		await Job.findOneAndUpdate(query, { $push: update })

		return NextResponse.json(comment)
	} catch (e) {
		console.error(e)
	}
}

export const getPostComments = async (req: any) => {
	const job = await Job.findById(req)
	const commentArray = job?.comments
	const comments = await Comment.find({ _id: { $in: commentArray } })
    console.log('getcomment',comments)
	return comments
}
