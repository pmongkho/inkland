'use client'

import Comment from '@/_models/Comments'
import React, { useEffect, useState } from 'react'
import LikeButton from './LikeButton'

export default function ReactionCard({
	data,
	user,
	_author,
	didUserLike,
	comments,
}: any) {
	const [expandComment, setExpandComment] = useState(false)
	const [_comments, setComments] = useState(comments)
	const showCommentForm = () => {
		setExpandComment(!expandComment)
	}
    
	const handleComment = async (form: FormData) => {
		const author = user.username
		const job = data._id
        const content = form.get('comment')?.toString() as string
        // const mentions = content?.match('(@\w*')

		const comment = new Comment({
			author,
			job,
            content,
            // mentions
		})

		try {
			const res = await fetch('/api/comments', {
				method: 'POST',
				body: JSON.stringify(comment),
            }).then(() => {

            })
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<>
			<div className='flex items-center justify-between p-2  text-slate-400 '>
				<LikeButton
					data={data}
					//job post id
					jobId={data?._id}
					//current userid
					sessionUserId={user?.id}
					//boolean if user liked the job
					didUserLike={didUserLike}
					likeCount={data?.likes.length}
				/>

				<div
					onClick={showCommentForm}
					className={`${expandComment ? 'text-blue-950' : 'text-slate-400'}`}
				>
					Comments
				</div>
				<button>
					<div className='flex items-center justify-center text-blue-950  p-2 rounded-md'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-6 h-6 block'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
							/>
						</svg>
						<div>
							{user?.role === 'ARTIST' && _author?.role === 'CLIENT'
								? 'Do'
								: 'Get'}{' '}
							This Tattoo
						</div>
					</div>
				</button>
			</div>
			<div className={`${expandComment ? 'visible' : 'hidden'}`}>
				<div>
					{_comments?.map((item: any) => (
						<div className='flex items-center justify-between'>
							<small>{item.author}</small>
							<small>{item.content}</small>
						</div>
					))}
				</div>
				<form action={handleComment}>
					<textarea
						className='w-full p-2'
						placeholder='say something..'
						name='comment'
					></textarea>
					<button
						className='inline-flex items-center my-2 py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-950 rounded-lg resize-y'
						type='submit'
					>
						Post comment
					</button>
				</form>
			</div>
		</>
	)
}