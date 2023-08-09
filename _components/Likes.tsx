'use client'
import React, { useEffect, useState } from 'react'

export default function Likes({ consult_id, current_user_id, user_like, likes }: any) {
	const [like, setLike] = useState<Boolean>(user_like)
    useEffect(() => {
        
    },[like])
	const handleLike = async () => {
		if (like === true) {
			setLike(false)
		}
	    else {
			setLike(true)
		}

		const user_id = current_user_id
		const consultation_id = consult_id
		const liked = like

		const data = {
			user_id,
			consultation_id,
			liked,
		}

		try {
			const res = await fetch('/api/likes', {
				method: 'POST',
				body: JSON.stringify(data),
			}).then((res) => res.json())
			console.log(res)
		} catch (error) {
			throw error
		}
	}

	return (
		<div className=' [&>*]:block flex items-center justify-center'>
			<button>
				<svg
					onClick={handleLike}
					xmlns='http://www.w3.org/2000/svg'
					fill={`${like ? 'purple' : 'none'}`}
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					className={`w-8 h-8 text-opacity-100 ${like ? 'text-slate-100' : 'text-slate-400'}`}
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
					/>
				</svg>
            </button>
            <span>{ likes.count }</span>
		</div>
	)
}
