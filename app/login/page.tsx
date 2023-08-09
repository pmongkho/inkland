import GoogleButton from '@/_components/GoogleButton'
import Hero from '@/_components/Hero'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/options'

export default async function SignIn() {
	const session = await getServerSession(authOptions)
	if (session?.user) {
		redirect('/')
	}

	return (
		<div className='h-screen'>
				<Hero />
		<div className='flex items-center justify-center h-[50vh]'>
					<div className='bg-white shadow rounded-lg divide-y divide-gray-200 '>
						<GoogleButton />
					</div>
			</div>
		</div>
	)
}
