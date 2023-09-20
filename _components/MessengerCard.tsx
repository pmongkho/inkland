import moment from 'moment'
import Avatar from './Avatar'


export default async function MessengerCard({ user, chat }: any) {
	const participant = chat.participants.filter((p: any) => p != user.id)
	let _user = await fetch(`/api/auth/users/${participant.length?participant:user.id}`)
		.then((res) => res.json())
		.catch((err) => console.error(err))

	const lastMessage = chat.messages[chat.messages.length - 1]
	const lastMessageSender = lastMessage.sender

	return (
		<div className='w-full p-2 flex items-center justify-between mb-2 hover:bg-slate-600 space-x-4 '>
			<div className=''>
				<Avatar user={ _user } size={40} />
			</div>

			<div className=' flex-1'>
				<p>{lastMessageSender.username===user.username?(<big>Me</big>):user.username}</p>
				<small className=' line-clamp-2'>
					{lastMessage.content}
				</small>
			</div>

			<small className='block'>
				{moment(lastMessage.createdAt).fromNow()}
			</small>
		</div>
	)
}
