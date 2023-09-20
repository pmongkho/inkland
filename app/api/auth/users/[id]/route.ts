import startDb from '@/_lib/db'
import User from '@/_models/User'
import { ObjectId } from 'mongoose'
import { NextResponse } from 'next/server'

export const GET = async (
	req: Request,
	{ params }: { params: { id: ObjectId } }
) => {
	await startDb()
	const user = await User.findById(params.id)
	return NextResponse.json(user)
}
