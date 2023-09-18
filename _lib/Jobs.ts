import Job from '@/_models/Job'
import User from '@/_models/User'
import { NextResponse } from 'next/server'
import startDb from './db'

export const getJobs = async () => {
	await startDb()
    try {
		const jobs = await Job.find().sort({ createdAt: -1 })
		return jobs
	} catch (error) {
		throw error
	}
}

export const createJob = async (request: Request) => {
	const body = await request.json()
	try {
		const job = await Job.create({ ...body })
		await User.findOneAndUpdate(
			{ _id: body.author },
			{ $push: { jobs: job._id } }
		)

		return NextResponse.json({ job: job }, { status: 201 })
	} catch (error) {
		console.log(error)
		throw error
	}
}