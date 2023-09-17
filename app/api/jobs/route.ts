import Job from '@/_models/Job'
import UserModel from '@/_models/User'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
	const body = await req.json()
	try {
		const job = await Job.create({ ...body })
		await UserModel.findOneAndUpdate(
			{ _id: body.author },
			{ $push: { jobs: job._id } }
		)

		return NextResponse.json({ job: job }, { status: 201 })
	} catch (error) {
		console.log(error)
		throw error
	}
}

export const GET = async () => {
	try {
		const jobs = await Job.find().sort({ createdAt: -1 })
		return jobs
	} catch (error) {
		throw error
	}
}



