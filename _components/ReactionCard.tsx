'use client'

import Comment, { CommentDocument } from '@/_models/Comments'
import axios from 'axios'
import moment from 'moment'
import { useRef, useState } from 'react'
import LikeButton from './LikeButton'
import { revalidateTag } from 'next/cache'
import { postComment } from '@/_serverActions/postComment'
import Avatar from './Avatar'

export default function ReactionCard({
	data,
	user,
	_author,
	didUserLike,
	comments,
}: any) {
	const ref = useRef<HTMLFormElement>(null)
	const [expandComment, setExpandComment] = useState(false)
	const showCommentForm = () => {
		setExpandComment(!expandComment)
	}

	const submitComment = async (form: FormData) => {

		const author = user.id
		const job = data._id
		const content = form.get('comment')?.toString() as string
		// const mentions = content?.match('(@\w*')

		const comment= {
			author,
			job,
			content,
		}
		postComment(comment)
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

				<div onClick={showCommentForm} className={` text-white`}>
					{comments.length} Comments 
				</div>
				<button>
					<div className='flex items-center justify-center  p-2 rounded-md'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-6 h-6 block mx-2 text-cyan-500'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
							/>
						</svg>
						<div className=' text-white'>
							{user?.role === 'ARTIST' && _author.role === 'CLIENT' ? 'Do' : 'Get'}{' '}
							This Tattoo
						</div>
					</div>
				</button>
			</div>
			<div className={`${expandComment ? 'visible' : 'hidden'}`}>
				<div className=' overflow-y-scroll h-28 px-2'>
					{comments?.map((item: any) => (
						<div className='flex items-center justify-between [&>*]:text-left py-2'>
							<Avatar user={_author} size={30} />
							<small className='flex-1 ml-2'>{item.content}</small>
							<small>{moment(item.createdAt).fromNow()}</small>
						</div>
					))}
				</div>
				<form
					ref={ref}
					action={async (FormData) => {
						await submitComment(FormData)
						ref.current?.reset()
					}}
				>
					<textarea
						className='w-full p-2 bg-slate-800 text-white border border-slate-600 rounded focus:outline-none'
						placeholder='say something..'
						name='comment'
					></textarea>
					<button
						className='inline-flex items-center my-2 py-1 px-4 text-center text-white bg-slate-800 rounded-lg border border-slate-600 shadow-lg'
						type='submit'
					>
						Post comment
					</button>
				</form>
			</div>
		</>
	)
}
