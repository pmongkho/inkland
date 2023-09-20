import startDb from '@/_lib/db'
import PublicChat from '@/_models/PublicChat'
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
		const publicChatsArray = user?.publicChats
		const chats = await PublicChat.find({
			_id: {
				$in: publicChatsArray,
			},
		})
			.populate({
				path: 'messages',
				populate: { path: 'sender' },
			})
			.exec()

		return NextResponse.json(chats)
	} catch (error) {
		throw error
	}
}
