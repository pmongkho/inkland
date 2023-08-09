import { getUserById } from '@/app/api/auth/users/route'
import Image from 'next/image'
import React from 'react'
import SwiperPics from './Swiper'
import moment from 'moment'
import Likes from './Likes'
import LikeModel from '@/_models/likeModel'
import { getLikesByConsultation } from '@/app/api/likes/route'

export async function JobCard({ data, user_id, user }: any) {
	const cuid = await getUserById(user_id)
	const date = new Date(data.date)
	const likes: any = await getLikesByConsultation(data._id)

	const liked = await LikeModel.findOne({
		consultation_id: data._id,
		user_id: user?.id,
	})

	return (
		<div className=' bg-slate-50 pt-2 my-4 shadow-lg'>
			<div className='flex items-center justify-between p-2 '>
				<div className='flex items-center justify-center'>
					<Image
						src={cuid?.image as string}
						alt='profile pic'
						width={40}
						height={40}
						className='rounded-full mt-1'
					/>
					<div className='[&>*]:block px-4'>
						<small className=''>{cuid?.name}</small>
						<small className=' text-slate-400'>{moment(date).fromNow()}</small>
					</div>
				</div>
				<div className='[&>*]:block'>
					<small>{cuid?.zipcode} </small>
					<small>{cuid?.phone}</small>
				</div>
			</div>
			<div
				className='relative
				
				w-screen
				flex
				items-center
				justify-between
				mb-1'
			>
				<div className='flex justify-between items-start w-full overflow-scroll'>
					<div className='w-[50vw]'>
						<SwiperPics data={data} />
					</div>

					<div className='[&>*]:block px-4 text-2xl'>
						<small className='[&>*]:block'>
							<b>
								<small>Placement:</small>
							</b>{' '}
							<small>{data?.placement}</small>
						</small>
						<small className='[&>*]:block'>
							<b>
								<small>Style:</small>
							</b>{' '}
							<small>{data?.style}</small>
						</small>
						<small className='[&>*]:block'>
							<b>
								<small>Addt Comments:</small>
							</b>
							<small className=' h-full'> {data?.comments}</small>
						</small>
					</div>
				</div>
			</div>
			<div className='flex items-center justify-evenly py-2  text-slate-400 '>
				<Likes
					consult_id={data?._id}
					current_user_id={user?.id}
					user_like={liked?.liked}
					likes={likes}
				/>
				<button>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-8 h-8'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z'
						/>
					</svg>
				</button>
			</div>
		</div>
	)
}
