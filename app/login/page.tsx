import GoogleButton from '@/_components/GoogleButton'
import GuestButton from '@/_components/GuestButton'
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
		<div className='-mt-14 lg:w-[40vw]'>
			<Hero />
			<div className='flex items-center justify-center'>
				<div>
					<div className='bg-white shadow rounded-lg mt-8'>
						<GoogleButton />
					</div>
					<GuestButton />
				</div>
			</div>
		</div>
	)
}
