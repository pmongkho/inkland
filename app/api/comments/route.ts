'use server'

import startDb from '@/_lib/db'
import Comment, { CommentDocument } from '@/_models/Comments'
import Job from '@/_models/Job'


import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
	await startDb()
	const body = await req.json()
	
		const comment = await Comment.create({
			...body,
		})

		const query = { _id: body.job }
		const update = { comments: comment._id }
		const job = await Job.findOneAndUpdate(query, { $push: update })
		
		revalidateTag('comments')
		return new Response(JSON.stringify(comment))

}

export const GET = async (req: Request) => {
	await startDb()
	const job = await Job.findById(req)
	const commentArray = job?.comments
	const comments = await Comment.find({ _id: { $in: commentArray } })

	return NextResponse.json(comments)
}
