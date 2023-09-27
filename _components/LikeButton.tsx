'use client'

import React, { useEffect, useState } from 'react'
import { revalidateTag } from 'next/cache'

export default function LikeButton({
	jobId,
	sessionUserId,
	didUserLike,
	likeCount,
}: any) {
	const [like, setLike] = useState<{ liked: boolean; likeCount: number }>({
		liked: didUserLike,
		likeCount: likeCount,
	})
	useEffect(() => {}, [like])

	const handleLike = async () => {

		if (like.liked === true) {
			setLike({ liked: false, likeCount: like.likeCount - 1 })
		} else {
			setLike({ liked: true, likeCount: like.likeCount + 1 })
		}

		const likeBody = {
			sessionUserId,
			jobId,
		}

		try {
			await fetch('/api/like', {
				method: 'POST',
				body: JSON.stringify(likeBody),
			}).then((res) => {
				res.json()
				revalidateTag('saved')
			})
		} catch (error) {
			throw error
		}
	}

	return (
		<div className=' [&>*]:block flex items-center justify-center'>
			<button onClick={handleLike}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill={`${like.liked ? 'purple' : 'none'}`}
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					className={`w-8 h-8 text-opacity-100 ${
						like.liked ? ' text-purple-800' : 'text-slate-400'
					}`}
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
					/>
				</svg>
			</button>
			<span
				className={`${like.likeCount > 0 ? ' text-white' : ' text-slate-4000'}`}
			>
				{like.likeCount}
			</span>
		</div>
	)
}
