import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import MessengerSearchBar from '@/_components/MessengerSearchBar'
import { getServerSession } from 'next-auth'

export default async function Messenger() {
	const session = await getServerSession(authOptions)
	const user = session?.user

	const users = await fetch(`${process.env.URL}/api/auth/users`)
		.then((res) => res.json())
		.catch((err) => console.error(err))

	const chats = await fetch(
		`${process.env.URL}/api/auth/users/public-chats/${user?.id}`
	)
		.then((res) => res.json())
		.catch((err) => console.error(err))

		return (
		<>
			{' '}
			<MessengerSearchBar user={user} users={users} chats={chats} />
		</>
	)
}
