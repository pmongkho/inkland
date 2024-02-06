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

	redirect('/job-page')

	return (
		<div className='lg:w-[40vw] pt-4 flex items-end justify-center max-h-screen'>
			<div className=' px-2'>
				<div className=' w-full mb-4'>
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
				<div className=' text-center'>
					<big className='block text-4xl text-left px-4 pt-20 pb-8 '>
						We help artists find clients and clients find artists.
					</big>

					<Link href={`${user?.role === 'ARTIST' ? '/job-page' : 'job-form'}`}>
						<button className='shadow-xl border border-cyan-500 bg-slate-800 text-white text-2xl px-4 py-2 rounded-md'>
							Start Now
						</button>
					</Link>
				</div>
			</div>
		</div>
	)
}
