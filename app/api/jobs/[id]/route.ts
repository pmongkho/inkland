import startDb from '@/_lib/db'
import Job from '@/_models/Job'
import { ObjectId } from 'mongoose'
import { NextResponse } from 'next/server'

export const GET = async (
	req: Request,
	{ params }: { params: { id: ObjectId } }
) => {
	await startDb()

	const job = await Job.findById(params.id).populate('author')

	return NextResponse.json(job)
}
