'use client'

import { getComments } from '@/app/api/comments/route'
import Comment from '@/_models/Comments'
import axios from 'axios'
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import LikeButton from './LikeButton'

export default function ReactionCard({
	_data,
	user,
	_author,
    didUserLike,
    comments
}: any) {
	const queryClient = useQueryClient()
	const [expandComment, setExpandComment] = useState(false)
	const showCommentForm = () => {
		setExpandComment(!expandComment)
	}
	const { data, isSuccess } = useQuery({
		queryKey: ['comments'],
        queryFn: async () => await getComments(_data._id),
        initialData:comments
	})

	const { mutate: submitComment } = useMutation({
		mutationFn: async (form: FormData) => {
			const author = user
			const job = _data._id
			const content = form.get('comment')?.toString() as string
			// const mentions = content?.match('(@\w*')

			const comment = new Comment({
				author,
				job,
				content,
			})
			await axios.post('/api/comments', JSON.stringify(comment))
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['comments'])
		},
	})

	return (
		<>
			<div className='flex items-center justify-between p-2  text-slate-400 '>
				<LikeButton
					data={data}
					//job post id
					jobId={_data?._id}
					//current userid
					sessionUserId={user?._id}
					//boolean if user liked the job
					didUserLike={didUserLike}
					likeCount={_data?.likes.length}
				/>

				<div onClick={showCommentForm} className={` text-white`}>
					Comments
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
					{data?.map((item: any) => (
						<div className='flex items-center justify-between'>
							<small>{item.author}</small>
							<small>{item.content}</small>
						</div>
					))}
				</div>
				<form action={submitComment}>
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
