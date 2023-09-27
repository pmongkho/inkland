import { getUserById } from '@/app/api/auth/users/route'
import moment from 'moment'
import Avatar from './Avatar'
import ReactionCard from './ReactionCard'
import SwiperPics from './Swiper'

//debug to make a client component!!!!!!!
export async function JobCard({ data, author, user }: any) {
	if (data?.length === 0) {
		return <h1 className=' px-2 py-2'>No Data Found</h1>
	}

	const didUserLike = data.likes.includes(user?.id)
	const comments = await fetch(`${process.env.URL}/api/comments/${data._id}`, {
		cache: 'no-cache',
		next: {
			tags: ['comments'],
		},
	}).then((res) => res.json()).catch((err)=>console.error(err))
	return (
		<div className=' bg-slate-800 pt-2 mb-4 shadow-xl'>
			{author._id.toString() === user?.id.toString() && (
				<div className=' flex items-center justify-end'>
					<button className=' p-2 rounded-full '>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-6 h-6'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
							/>
						</svg>
					</button>
				</div>
			)}

			<div className='flex items-center justify-between p-2 '>
				<div className='flex items-center justify-center'>
					<Avatar user={author} size={40} />
					<div className='[&>*]:block px-4'>
						<small className=''>@{author?.username}</small>
						<small className=' text-slate-400'>
							{moment(data?.createdAt).fromNow()}
						</small>
					</div>
				</div>
				<div className='[&>*]:block'>
					<small>{author?.profile.zipcode} </small>
				</div>
			</div>
			<div className=' pl-2 py-4'>{data?.tattoo.addlInfo}</div>

			<div
				className='relative
				w-screen
				flex
				items-center
				justify-between
				mb-1'
			>
				<div className='flex justify-between items-start'>
					<div className='w-[50vw]'>
						<SwiperPics photos={data.tattoo.photos} />
					</div>

					<div className=' px-4 text-md'>
						<div className=' '>
							<div>
								<b>
									<small>Style: </small>
								</b>
								<small>{data?.tattoo.style}</small>
							</div>
							<div>
								<b>
									<small>Subject Matter: </small>
								</b>
								<small>{data?.tattoo.subjectMatter}</small>
							</div>
							<div>
								<b>
									<small>Placement: </small>
								</b>
								<small>{data?.tattoo.placement}</small>
							</div>
						</div>
						{author?.role === 'ARTIST' && (
							<div className='flex items-start'>
								<small className=' font-bold'>Offer: </small>
								<div className=' ml-1'>
									<div>
										<small>${data?.tattoo.price}</small>
									</div>
									<div>
										<small>{data?.tattoo.duration}</small>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>

			<ReactionCard
				data={data}
				didUserLike={didUserLike}
				user={user}
				author={author}
				comments={comments}
			/>
		</div>
	)
}
