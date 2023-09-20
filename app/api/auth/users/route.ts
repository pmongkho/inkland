import startDb from '@/_lib/db'
import Job from '@/_models/Job'
import User from '@/_models/User'
import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import { cache } from 'react'

export const POST = async (req: Request): Promise<NextResponse> => {
	await startDb()
	const body = await req.json()

	const oldUser = await User.findOne({ username: body.username })
	if (oldUser)
		return NextResponse.json(
			{ error: 'username is already in use!' },
			{ status: 422 }
		)
	const user = await User.create({ ...body })

	return NextResponse.json(user)
}

export const GET = async (req: Request) => {
	try {
		const users = await User.find()
		return NextResponse.json(users)
	} catch (err) {
		console.error(err)
	}
}

export async function getUserById(id: Request) {
	try {
		await startDb()
		const user = await User.findById(id)
		return user
	} catch (error) {
		throw error
	}
}
export async function getSavedByUser(id: Request) {
	try {
		await startDb()
		const user = await User.findById(id)
		const jobsArray = user?.saved
		const jobs = await Job.find({
			_id: {
				$in: jobsArray,
			},
		})
		return jobs
	} catch (error) {
		throw error
	}
}

export async function getUserTagged(id: Request) {
	try {
		await startDb()
		const user = await User.findById(id)
		const jobsArray = user?.tagged
		const jobs = await Job.find({
			_id: {
				$in: jobsArray,
			},
		})
		return jobs
	} catch (error) {
		throw error
	}
}
export async function getCompletedByUser(id: Request) {
	try {
		await startDb()
		const user = await User.findById(id)
		const jobsArray = user?.completed
		const jobs = await Job.find({
			_id: {
				$in: jobsArray,
			},
		})
		return jobs
	} catch (error) {
		throw error
	}
}
