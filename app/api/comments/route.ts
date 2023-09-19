'use server'

import startDb from '@/_lib/db'
import Comment from '@/_models/Comments'
import Job from '@/_models/Job'
import { revalidateTag } from 'next/cache'
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

		revalidateTag('comments')

		return NextResponse.json(comment)
	} catch (e) {
		console.error(e)
	}
}

export const GET = async (req: Request) => {
	await startDb()
	console.log(req.url, 'requrlll')
	const job = await Job.findById(req)
	const commentArray = job?.comments
	const comments = await Comment.find({ _id: { $in: commentArray } })
		.populate('author')
		.exec()

	return NextResponse.json(comments)
}
