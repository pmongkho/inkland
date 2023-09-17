import Avatar from '@/_components/Avatar'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import image from '../_media/images/artist.jpeg'
import { authOptions } from './api/auth/[...nextauth]/options'

export default async function Home() {
	const session = await getServerSession(authOptions)
	const user = session?.user
	if (session?.user.role === undefined && session?.user) {
		redirect('/signup')
	}
	return (
		<div className='h-screen flex items-start justify-center relative'>
			<div className=''>
				<div className=' [&>*]:bg-slate-50 text-blue-950  shadow-lg w-full mb-4'>
					<div className='   flex items-center justify-between p-2 '>
						<Link href='/profile/content/saved'>
							<Avatar user={user} size={70} />
						</Link>

						<div className='[&>*]:block '>
							<small>@{user?.username}</small>
							<small>{user?.name as string}</small>
							<small>{user?.zipcode as string}</small>
						</div>
					</div>
				</div>

				<big className='block text-4xl py-4 '>
					We help artists find clients and clients find artists.
				</big>
				<Image
					className='block relative'
					src={image}
					alt='artist client picture'
				/>
				<Link href={`${user?.role === 'ARTIST' ? '/job-page' : 'job-form'}`}>
					<button className=' absolute top-[50vh] right-[50%] bg-slate-700 text-white text-2xl px-4 py-2 rounded-md shadow-lg'>
						Start Now
					</button>
				</Link>
			</div>
		</div>
	)
}
