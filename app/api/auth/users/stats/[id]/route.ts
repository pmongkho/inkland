import startDb from '@/_lib/db'
import Job from '@/_models/Job'
import User from '@/_models/User'
import { ObjectId } from 'mongoose'
import { NextResponse } from 'next/server'

export async function GET(
	req: Request,
	{ params }: { params: { id: ObjectId } }
) {
	try {
		await startDb()
		const user = await User.findById(params.id)
		const completedArray = user?.completed
		const jobs = await Job.find({
			_id: {
				$in: completedArray,
			},
		}).populate('author')

		return NextResponse.json(jobs)
	} catch (error) {
		throw error
	}
}
