'use client'
import Avatar from '@/_components/Avatar'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function ProfileLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const { data: session } = useSession()
	const user = session?.user
	const pathname = usePathname()
	return (
		<div className=' [&>*]:bg-slate-50  shadow-lg'>
			<div className='  relative flex items-center justify-left p-2 '>
				<Avatar user={user} size={80} />
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					className='w-6 h-6 absolute top-0 right-0 m-2'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
					/>
				</svg>

				<div className='[&>*]:block ml-4'>
					<small>@{user?.username}</small>
					<small>{user?.name as string}</small>
					<small>{user?.zipcode as string}</small>
				</div>
			</div>
			<div className='w-[50vw] truncate ml-4'>
				<small>
					{/* <small>{store.getState().users.user.profile?.bio}</small> */}
				</small>
			</div>
	
			<div className='flex justify-evenly items-end py-4 border-b-slate-300 border-b'>
				<Link href='/profile/content/saved'>
					<div
						className={`${
							pathname === '/profile/content/saved' ? '' : 'hidden'
						} p-1 bg-slate-300 rounded hover:visible`}
					></div>
					<small>SAVED</small>
				</Link>

				<Link href='/profile/content/my-stuff'>
					<div
						className={`${
							pathname === '/profile/content/my-stuff' ? '' : 'hidden'
						} p-1 bg-slate-300 rounded hover:visible`}
					></div>
					<small>MY STUFF</small>
				</Link>
				<Link href='/profile/content/tagged'>
					<div
						className={`${
							pathname === '/profile/content/tagged' ? '' : 'hidden'
						} p-1 bg-slate-300 rounded hover:visible`}
					></div>
					<small>TAGGED</small>
				</Link>
				<Link href='/profile/content/stats'>
					<div
						className={`${
							pathname === '/profile/content/stats' ? '' : 'hidden'
						} p-1 bg-slate-300 rounded hover:visible`}
					></div>
					<small>STATS</small>
				</Link>
			</div>
			{children}
		</div>
	)
}
