import startDb from '@/_lib/db'
import Job from '@/_models/Job'
import User from '@/_models/User'
import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import { cache } from 'react'

export const POST = async (req: Request): Promise<NextResponse> => {
	await startDb()
	const body = await req.json()

	// Ensure email exists in request
	if (!body.email) {
		return NextResponse.json({ error: 'Email is required' }, { status: 400 })
	}

	// Find existing user
	const existingUser = await User.findOne({ 'profile.email': body.email })

	if (existingUser) {
		// ✅ Only update `username`, `zipcode`, and `role`
		const updatedUser = await User.findOneAndUpdate(
			{ 'profile.email': body.email },
			{
				$set: {
					username: body.username,
					'profile.zipcode': body.zipcode,
					role: body.role,
				},
			},
			{ new: true, runValidators: true } // ✅ Ensure Mongoose validation
		)

		return NextResponse.json(updatedUser)
	}

	// If user does not exist, create a new one (fallback)
	const newUser = await User.create({
		email: body.email,
		username: body.username || 'default_user',
		role: body.role || 'BLANK',
		profile: {
			zipcode: body.zipcode || '00000',
		},
	})

	return NextResponse.json(newUser)
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
