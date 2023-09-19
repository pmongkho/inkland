import startDb from '@/_lib/db'
import Job from '@/_models/Job'
import User from '@/_models/User'
import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
	const body = await req.json()
	try {
		const job = await Job.create({ ...body })
		await User.findOneAndUpdate(
			{ _id: body.author },
			{ $push: { jobs: job._id } }
		)
			revalidateTag('jobs')
		return NextResponse.json({ job: job }, { status: 201 })
	} catch (error) {
		throw error
	}
}

export const GET = async (request: Request) => {
	await startDb()
	try {
		const jobs = await Job.find().sort({ createdAt: -1 })
		return NextResponse.json(jobs) 
	} catch (error) {
		throw error
	}
}
