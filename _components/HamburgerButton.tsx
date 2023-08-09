'use client'

import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Hamburger() {
	const { data: session } = useSession()
	const router = useRouter()

	const [active, setActive] = useState(false)
	const handleClick = () => {
		setActive(!active)
	}
	const handleHidden = () => {
		return active ? '' : 'hidden'
	}
	return (
		<div className='relative'>
			<button
				id='dropdownUserAvatarButton'
				data-dropdown-toggle='dropdownAvatar'
				className='flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
				type='button'
				onClick={handleClick}
			>
				<span className='sr-only'>Open user menu</span>
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
						d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
					/>
				</svg>
			</button>

			<div
				id='dropdownAvatar'
				className={`absolute right-0 bottom-12 ${handleHidden()} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
			>
				<div className=' text-center px-4 py-3 text-sm text-gray-900 dark:text-white'>
					<div>
						<Image
							className='rounded-full m-auto'
							src={session?.user.image as string}
							alt='profile picture'
							width={50}
							height={50}
						/>
						<div>{session?.user?.userRole?.toUpperCase() as string}</div>
						<div>{session?.user?.name}</div>
						<div className='font-medium truncate'>{session?.user?.email as string}</div>
					</div>
				</div>
				<ul
					className='py-2 text-sm text-gray-700 dark:text-gray-200'
					aria-labelledby='dropdownUserAvatarButton'
				>
					<li>
						<a
							href='#'
							className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
						>
							Dashboard
						</a>
					</li>
					<li>
						<a
							href='#'
							className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
						>
							Settings
						</a>
					</li>
					<li>
						<a
							href='#'
							className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
						>
							Earnings
						</a>
					</li>
				</ul>
				<div
					className='py-2'
					onClick={() => {
						signOut(), router.replace('/login')
					}}
				>
					<a
						href='#'
						className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
					>
						Sign out
					</a>
				</div>
			</div>
		</div>
	)
}
