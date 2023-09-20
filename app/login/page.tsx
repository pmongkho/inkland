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
		<div className=' flex items-start'>
			<div>
				<Hero />
				<div className='flex items-center justify-center pt-20'>
					<div className='bg-white shadow rounded-lg '>
						<GoogleButton />
					</div>
				</div>
			</div>
		</div>
	)
}
