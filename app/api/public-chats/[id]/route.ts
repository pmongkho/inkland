import startDb from '@/_lib/db'
import PublicChat from '@/_models/PublicChat'
import { ObjectId } from 'mongoose'
import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export const POST = async (
	req: Request,
	{ params }: { params: { id: ObjectId } }
) => {
	await startDb()
	const message = await req.json()

	const chat = await PublicChat.findOneAndUpdate(
		{ _id: params.id },
		{ $push: { messages: message } }
	)
revalidateTag('chats')
		return NextResponse.json({ message: 'OK', chat }, { status: 201 })
	
}

export const GET = async (
	req: Request,
	{ params }: { params: { id: ObjectId } }
) => {
	await startDb()
	const chat = await PublicChat.findById(params.id).populate('participants')
	return NextResponse.json(chat)
}
