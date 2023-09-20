'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Avatar from './Avatar'
import MessengerCard from './MessengerCard'

export default function MessengerSearchBar({ user, users, chats }: any) {
	const [messageSearch, setMessageSearch] = useState(false)
	const [dropdownUsers, setDropdownUsers] = useState(false)
	const router = useRouter()

	return (
		<div className=' '>
			<div className='w-full flex justify-between items-start z-0 bg-slate-800 border-slate-700 border-b [&>*]:mb-2 text-white  px-2 py-4 mt-2'>
				<div className={`${messageSearch ? 'hidden' : 'visible'}`}>
					<input
						className={`
					  bg-slate-800 text-white border border-slate-700  outline-none py-2 rounded pl-2`}
						type='search'
						placeholder='Search Messages'
					/>
				</div>
				<div className={`${messageSearch ? 'visible' : 'hidden'}`}>
					<input
						placeholder='To Whom?'
						type='search'
						// onClick={() => setDropdownUsers(!dropdownUsers)}
						onChange={(e) =>
							e.target.value.length !== 0
								? setDropdownUsers(true)
								: setDropdownUsers(false)
						}
						className={`transition ease-in-out bg-slate-800 text-white border border-slate-700  outline-none py-2 rounded pl-2 w-full`}
					/>
					<div className={` ${dropdownUsers ? 'visible' : 'hidden'} text-left`}>
						<ul className='py-2 '>
							{users.map((user: any) => (
								<Link href={`/messenger/new-message/${user._id}`}>
									<button className=' w-full'>
										<li className='flex items-center justify-between bg-slate-700 py-2 px-4 border border-slate-900 my-2 rounded-lg shadow-xl'>
											<Avatar user={user} size={40} />{' '}
											<p className=' pl-2'>{user.username}</p>
										</li>
									</button>
								</Link>
							))}{' '}
						</ul>
					</div>
				</div>
				<button onClick={() => setMessageSearch(!messageSearch)} className=''>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-8 h-8 mx-2'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
						/>
					</svg>
				</button>
			</div>
			<div>
				{chats.length !== 0 ? (
					chats.map((chat: any) => (
						<Link href={`/messenger/message/${chat._id}`}>
							<MessengerCard user={user} chat={chat} />
						</Link>
					))
				) : (
					<h1 className='py-2 px-2'>No Data Found</h1>
				)}
			</div>
		</div>
	)
}
