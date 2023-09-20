import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { PublicChatDocument } from '@/_models/PublicChat'
import User from '@/_models/User'
import axios from 'axios'
import { getServerSession } from 'next-auth'
import Avatar from './Avatar'
import moment from 'moment'


export default async function MessengerCard({ user, chat }: any) {
	const participant = chat.participants.filter((p: any) => p != user.id)
	const _user = await fetch(`/api/auth/users/${participant}`)
		.then((res) => res.json())
		.catch((err) => console.error(err))

	return (
		<div className='w-full p-2 flex items-center justify-between mb-2 hover:bg-slate-600 space-x-4 '>
			<div className=''>
				<Avatar user={_user} size={60} />
			</div>

			<div className=''>
				<big>{_user.username}</big>
				<small className=' line-clamp-2'>
					{chat.messages[chat.messages.length - 1].content}
				</small>
			</div>

			<small className='block'>
				{moment(chat.messages[chat.messages.length - 1].createdAt).fromNow()}
			</small>
		</div>
	)
}
