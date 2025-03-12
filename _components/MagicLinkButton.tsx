'use client'

import { signIn } from 'next-auth/react'
import React, { useState } from 'react'

export default function MagicLinkButton() {
	const [email, setEmail] = useState('')
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState('')

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading(true)
		setMessage('')

		// Use NextAuth's signIn method for email
		const res = await signIn('email', {
			email,
			redirect: false, // Handle redirection manually if you prefer
			callbackUrl: '/', // Redirect URL after successful sign in
		})

		if (res?.ok) {
			setMessage('Check your email for a sign-in link!')
		} else {
			setMessage('Failed to send sign-in link.')
		}

		setLoading(false)
	}

	return (
		<div className='w-full'>
			<form
				onSubmit={handleSubmit}
				className='flex items-center justify-between space-x-4'
			>
				<div>
					<input
						type='email'
						placeholder='Enter your email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						className='w-full p-3 rounded border border-gray-600 bg-gray-800 text-white'
					/>
				</div>
				<div>
					<button
						type='submit'
						disabled={loading}
						className='w-full py-3 px-4 rounded bg-gray-700 hover:bg-blue-700 text-white font-semibold'
					>
						{loading ? 'Sending...' : 'Magic Link'}
					</button>
				</div>
			</form>
			{message && (
				<p className='mt-3 text-center text-white text-xs'>{message}</p>
			)}
		</div>
	)
}
