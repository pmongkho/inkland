import {getServerSession} from 'next-auth'
import {authOptions} from '../api/auth/[...nextauth]/options'
import {redirect} from 'next/navigation'
import Hero from '@/_components/Hero'
import GoogleButton from '@/_components/GoogleButton'
import GuestButton from '@/_components/GuestButton'
import MagicLinkButton from '@/_components/MagicLinkButton'

export default async function SignIn() {
	const session = await getServerSession(authOptions)
	if (session?.user) {
		redirect('/')
	}

	return (
		<div className=' flex flex-col items-center  justify-start px-4 h-full'>
			{/* Hero Section */}
			<div className='h-[55vh] flex items-start justify-center w-full'>
				<div>
					<h1 className='block text-white text-3xl font-bold '>Inkland.</h1>
					<Hero /> {/* Tagline */}
					<big className='text-2xl text-center text-white mt-8'>
						Bringing tattoo artists and clients together.
					</big>
				</div>
			</div>

			{/* Authentication Buttons */}
			<div className='flex flex-col items-center w-full space-y-4 py-10'>
				<GoogleButton />
				<MagicLinkButton/>
				<GuestButton />
			</div>
		</div>
	)
}
