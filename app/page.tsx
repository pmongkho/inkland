import { getServerSession } from 'next-auth'
import {userEmailExists } from './api/auth/users/route'
import { redirect } from 'next/navigation'
import { authOptions } from './api/auth/[...nextauth]/options'

export default async function Home() {
	const session = await getServerSession(authOptions)
	const isUser = await userEmailExists(session?.user?.email)

	if (!isUser) {
		redirect('/signup')
	} else {
		{
			session?.user?.userRole === 'artist' ? redirect('/profile') : redirect('/profile')
		}
	}
	return (
		<div className=' flex content-evenly place-items-stretch justify-center space-x-2'>
			<div className=''></div>
		</div>
	)
}
