import startDb from '@/_lib/db'
import PublicChat from '@/_models/PublicChat'
import User from '@/_models/User'
import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
	const body = await req.json()
	try {
		const chat = await PublicChat.create({ ...body })
		const userIDs = chat.participants

		await User.updateMany(
			{
				_id: {
					$in: userIDs,
				},
			},
			{ $push: { publicChats: chat._id } }
		)
		revalidateTag('chats')

		return NextResponse.json(chat)
	} catch (error) {
		throw error
	}
}
