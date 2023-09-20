'use server'

import { revalidateTag } from 'next/cache';

export const postComment = async (comment:any) => {
    		await fetch(`${process.env.URL}/api/comments`, {
					method: 'POST',
					body: JSON.stringify(comment),
				}).then((res) => {
					res.json()
					revalidateTag('comments')
				})
}