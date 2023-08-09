'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function Signup() {
	const router = useRouter()
	const { data: session } = useSession()
	if (session?.user?.zipcode) {
		router.replace('/')
	}

	const [roleArtist, setArtistRole] = useState(false)
	const [roleClient, setClientRole] = useState(false)
	const [role, setRole] = useState('')

	const roleActive = 'bg-blue-950 text-white'
	const roleInactive = 'border-blue-950 border'

	const handleRoles = (value: string) => {
		if (value === 'artist') {
			setArtistRole(true)
			setClientRole(false)
		} else {
			setArtistRole(false)
			setClientRole(true)
		}
		setRole(value)
	}

	const handleSubmit = async (data: FormData) => {
		if (!role) return

		const name = session?.user.name
		const phone = data.get('phone')?.toString()
		const email = session?.user.email
		const zipcode = data.get('zipcode')?.toString()
		const image = session?.user.image
		const userRole = role

		const userInfo = {
			name,
			phone,
			email,
			zipcode,
			image,
			userRole,
		}

		try {
			const res = await fetch('/api/auth/users', {
				method: 'POST',
				body: JSON.stringify(userInfo),
			}).then((res) => res.json())
			console.log(res)
			router.replace('/login')
		} catch (error) {
			throw error
		}
	}

	return (
		<div className='bg-grey-lighter min-h-screen flex flex-col'>
			<div className='w-screen container flex-1 flex flex-col items-center justify-center '>
				<form
					action={handleSubmit}
					className=' bg-white px-6 py-8 rounded shadow-md text-black w-full'
				>
					<h1 className='mb-8 text-3xl text-center'>Sign up</h1>
					<div className='flex justify-between items-center [&>*]:w-full mb-4'>
						<div
							onClick={() => handleRoles('artist')}
							className={`mr-2 text-center py-3 rounded ${
								roleArtist ? roleActive : roleInactive
							} text-blue-950 `}
						>
							Artist
						</div>
						<div
							onClick={() => handleRoles('user')}
							className={`text-center py-3 rounded ${
								roleClient ? roleActive : roleInactive
							}  text-blue-950`}
						>
							Client
						</div>
					</div>
					<input
						type='text'
						className='block border border-grey-light w-full p-3 rounded mb-4'
						placeholder='Username'
						name='username'
					/>
					<input
						type='text'
						className='block border border-grey-light w-full p-3 rounded mb-4'
						value={session?.user.name}
					/>
					<input
						type='text'
						className='block border border-grey-light w-full p-3 rounded mb-4'
						value={session?.user.email as string}
					/>

					<input
						type='tel'
						className='block border border-grey-light w-full p-3 rounded mb-4'
						name='phone'
						placeholder='Phone'
						required
					/>
					<input
						type='text'
						className='block border border-grey-light w-full p-3 rounded mb-4'
						name='zipcode'
						placeholder='Zipcode'
						required
					/>

					<button
						type='submit'
						className='w-full text-center py-3 rounded bg-blue-950 hover:bg-blue-800 text-white hover:bg-green-dark focus:outline-none my-1'
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
		</div>
	)
}
