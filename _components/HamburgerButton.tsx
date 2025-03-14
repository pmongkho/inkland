'use client'

import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Avatar from './Avatar'

export default function Hamburger() {
	const { data: session } = useSession()
	const user = session?.user
	const router = useRouter()
	const [active, setActive] = useState(false)

	// 🔹 Create a ref for the dropdown container
	const dropdownRef = useRef<HTMLDivElement | null>(null)

	// ✅ Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setActive(false)
			}
		}

		// Add event listener
		document.addEventListener('mousedown', handleClickOutside)

		// Cleanup event listener
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	return (
		<div className='relative' ref={dropdownRef}>
			<button
				id='dropdownUserAvatarButton'
				data-dropdown-toggle='dropdownAvatar'
				className='flex mx-3 text-sm bg-slate-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
				type='button'
				onClick={() => setActive((prev) => !prev)}
			>
				<span className='sr-only'>Open user menu</span>

				<Avatar user={user} size={40} />
			</button>

			{active && (
				<div
					id='dropdownAvatar'
					className='z-30 absolute right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 border border-slate-900'
				>
					<div className='rounded-lg bg-slate-700 text-center px-4 py-3 text-sm dark:text-white'>
						<Avatar user={user} size={50} />
						<div>{user?.role}</div>
						<div>{user?.name}</div>
						<div className='font-medium truncate'>{user?.email}</div>
					</div>
					<ul
						className='bg-slate-700 py-2 text-sm text-gray-700 dark:text-gray-200'
						aria-labelledby='dropdownUserAvatarButton'
					>
						<li>
							<Link
								href='/profile/content/saved'
								className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
							>
								Profile
							</Link>
						</li>
					</ul>
					<div
						className='py-2'
						onClick={() => {
							signOut({ callbackUrl: '/login' })
						}}
					>
						<a
							href='#'
							className='bg-slate-700 block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
						>
							Sign out
						</a>
					</div>
				</div>
			)}
		</div>
	)
}
