import startDb from '@/_lib/db'
import LikeModel from '@/_models/likeModel'
import { NextResponse } from 'next/server'

export const POST = async (req: Request): Promise<NextResponse> => {
	const body = await req.json()
	if (body.liked === true) {
		body.liked = false
	} else {
		body.liked = true
	}

	await startDb()
	const filter = {
		user_id: body.user_id,
		consultation_id: body.consultation_id,
	}

	const like = await LikeModel.findOneAndUpdate(
		filter,
		{ liked: body.liked },
		{
			new: true,
			upsert: true,
		}
	)

	return NextResponse.json({
		like: {
			id: like?._id,
			user_id: like?.user_id,
			consultation_id: like?.consultation_id,
		},
	})
}

export async function getLikesByConsultation(consultation_id: Request) {
	await startDb()
    const likes = await LikeModel.find({ consultation_id: consultation_id })
    const users: any[] = []
    likes.map((like) => {
        users.push(like.user_id)
    })

    const count = users.length

    const like = {
        likes,
        users,
        count
    }

    return like
}

export async function getLikesByUser(user_id: string | Request | undefined) {
	await startDb()
	const likes = await LikeModel.find({ user_id: user_id })
	const consultations: any[] = []

	likes.map((like) => {
		consultations.push(like.consultation_id)
	})

	const count = consultations.length

	const like = {
		likes,
		consultations,
		count,
	}

	return like
}