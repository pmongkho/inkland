'use server'

import startDb from '@/_lib/db'
import Comment from '@/_models/Comments'
import Job from '@/_models/Job'
import { ObjectId } from 'mongoose'
import { NextResponse } from 'next/server'

export const GET = async (
	req: Request,
	{ params }: { params: { id: ObjectId } }
) => {
	
	await startDb()
	const job = await Job.findById(params.id)
	const commentArray = job?.comments
	const comments = await Comment.find({ _id: { $in: commentArray } })
		.populate('author')
		.exec()

	return NextResponse.json(comments)
}
