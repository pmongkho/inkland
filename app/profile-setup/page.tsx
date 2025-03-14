'use client'

import {generateUsername} from '@/_lib/genUserName'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {useState} from 'react'
import magicWand from '@/_media/svg/magic-wand.svg'
import Image from 'next/image'

export default function ProfileSetup() {
	const { data: session, update } = useSession()
    const router = useRouter()
    
    console.log(session?.user,"session-user")

	const [username, setUsername] = useState('')
	const [zipcode, setZipcode] = useState('')
	const [roleArtist, setArtistRole] = useState(false)
	const [roleClient, setClientRole] = useState(false)
	const [role, setRole] = useState('')

	const roleActive = 'border-cyan-500 border text-white'
	const roleInactive = 'border-slate-900 border'

	// Role Selection Logic
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

	// Generate and set a unique username
	const handleGenerateUsername = () => {
		const newUsername = generateUsername() // Call your custom username generator
		setUsername(newUsername)
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!username || !zipcode || !role) return

		const res = await fetch('/api/auth/users', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: session?.user.email,
				username,
				zipcode,
                role,
			}),
		})

		if (res.ok) {
	const updatedUser = await res.json()

	// ✅ Force refresh of session & JWT
	await update({
		...session,
		user: {
			...session?.user,
			role: updatedUser.role,
			username: updatedUser.username,
			zipcode: updatedUser.profile.zipcode,
		},
	})

	console.log('✅ User profile updated successfully:', updatedUser)

	// ✅ Redirect to home
	router.push('/')
	}
	}

	return (
		<div className='lg:w-[40vw] h-screen flex flex-col items-start justify-start '>
			<form
				onSubmit={handleSubmit}
				className='border border-slate-700 px-6 py-8 rounded shadow-md w-full h-full'
			>
				<h1 className='mb-8 text-3xl text-center'>Complete Your Profile</h1>

				{/* Role Selection */}
				<div className='flex justify-between items-center [&>*]:w-full mb-4'>
					<div
						onClick={() => handleRoles('ARTIST')}
						className={`mr-2 text-center py-3 rounded cursor-pointer ${
							roleArtist ? roleActive : roleInactive
						}`}
					>
						Artist
					</div>
					<div
						onClick={() => handleRoles('CLIENT')}
						className={`text-center py-3 rounded cursor-pointer ${
							roleClient ? roleActive : roleInactive
						}`}
					>
						Client
					</div>
				</div>

				{/* Username Input + Generate Button */}
				<div className='flex items-center space-x-2 mb-4'>
					<input
						type='text'
						placeholder='Username'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className='bg-slate-800 block border border-slate-700 w-full p-3 rounded focus:outline-none text-white'
					/>
					<button
						type='button'
						onClick={handleGenerateUsername}
						className='px-4 py-3 rounded bg-cyan-700 text-white hover:bg-cyan-600 text-2xl'
					>
				<Image src={magicWand} alt='magicwand' className=' text-3xl h-6 w-8'/>
					</button>
				</div>

				{/* Zipcode Input */}
				<input
					type='text'
					placeholder='Zipcode'
					value={zipcode}
					onChange={(e) => setZipcode(e.target.value)}
					className='bg-slate-800 block border border-slate-700 w-full p-3 rounded mb-4 focus:outline-none text-white'
					pattern='^(\d{5}(?:\-\d{4})?)$'
					required
				/>

				{/* Submit Button */}
				<button
					type='submit'
					className='w-full text-center py-3 rounded border-cyan-500 border text-white focus:outline-none my-1'
				>
					Save Profile
				</button>
			</form>
		</div>
	)
}
