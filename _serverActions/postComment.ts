'use server'

import startDb from '@/_lib/db'
import { revalidateTag } from 'next/cache'

export const postComment = async (comment: any) => {
	await startDb()
	await fetch(`${process.env.URL}/api/comments`, {
		method: 'POST',
		body: JSON.stringify(comment),
	}).then((res) => {
		res.json()
		revalidateTag('comments')
	})
}
