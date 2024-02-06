'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function Signup() {
	const router = useRouter()
	const { data: session } = useSession()

	if (session?.user.role || session?.user.email === 'guest@gmail.com') {
		router.push('/')
	}

	const [roleArtist, setArtistRole] = useState(false)
	const [roleClient, setClientRole] = useState(false)
	const [_role, setRole] = useState('')

	const roleActive = 'border-cyan-500 border text-white'
	const roleInactive = 'border-slate-900 border'

	const handleRoles = (value: string) => {
		if (value === 'ARTIST') {
			setArtistRole(true)
			setClientRole(false)
		} else {
			setArtistRole(false)
			setClientRole(true)
		}
		setRole(value)
	}

	const handleSubmit = async (
	// 
	data:FormData) => {
		if (!_role) return

		const username = data.get('username')?.toString()
		const name = session?.user.name
		const email = session?.user.email
		const zipcode = data.get('zipcode')?.toString()
		const image = session?.user.image
		const role = _role

		const userInfo = {
			username,
			role,
			profile: {
				name,
				email,
				image,
				zipcode,
			},
		}

		try {
			const res = await fetch('/api/auth/users', {
				method: 'POST',
				body: JSON.stringify(userInfo),
			}).then((res) => res.json())
			router.replace('/login')
		} catch (error) {
			throw error
		}
	}

	return (
		<div className='lg:w-[40vw] h-screen flex flex-col items-start justify-center '>
			<form
				action={handleSubmit}
				className='border border-slate-700 px-6 py-8 rounded shadow-md w-full'
			>
				<h1 className='mb-8 text-3xl text-center'>Sign up</h1>
				<div className='flex justify-between items-center [&>*]:w-full mb-4'>
					<div
						onClick={() => handleRoles('ARTIST')}
						className={`mr-2 text-center py-3 rounded ${
							roleArtist ? roleActive : roleInactive
						}  `}
					>
						Artist
					</div>
					<div
						onClick={() => handleRoles('CLIENT')}
						className={`text-center py-3 rounded ${
							roleClient ? roleActive : roleInactive
						}  `}
					>
						Client
					</div>
				</div>
				<input
					type='text'
					className='bg-slate-800 block border border-slate-700 w-full p-3 rounded mb-4 focus:outline-none'
					placeholder='Username'
					name='username'
				/>
				<input
					type='text'
					className=' bg-slate-800 block border border-slate-700 w-full p-3 rounded mb-4 focus:outline-none'
					name='zipcode'
					placeholder='Zipcode'
					pattern='^(\d{5}(?:\-\d{4})?)$'
					required
				/>

				<button
					type='submit'
					className='w-full text-center py-3 rounded border-cyan-500 border  text-white focus:outline-none my-1'
				>
					Create Account
				</button>
			</form>

			<div className='text-grey-dark mt-6'>
				Already have an account?
				<Link
					className='no-underline border-b border-blue text-blue'
					href='/login'
				>
					Log in
				</Link>
				.
			</div>
		</div>
	)
}
