import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import Avatar from '@/_components/Avatar'
import { ObjectId } from 'mongoose'
import { getServerSession } from 'next-auth'
import { revalidateTag } from 'next/cache'
import moment from 'moment'
import User from '@/_models/User'
import { getUserById } from '@/app/api/auth/users/route'

export default async function Message({
	params,
}: {
	params: { id: ObjectId }
}) {
	const chat = await fetch(`${process.env.URL}/api/public-chats/${params.id}`, {
		cache: 'no-cache',
		next: { tags: ['chats'] },
	})
		.then((res) => res.json())
		.catch((err) => console.error(err))

	const session = await getServerSession(authOptions)
	const sessUser = await fetch(
		`${process.env.URL}/api/auth/users/${session?.user.id}`
	)
		.then((res) => res.json())
		.catch((err) => console.error(err))

	const receiver = chat.participants.find((p: any) => {
		return p._id !== sessUser?._id
	})

	const submitMessage = async (form: FormData) => {
		'use server'
		const content = form.get('content')?.toString()
		const sender = sessUser?._id

		const message = {
			sender,
			content,
		}

		await fetch(`${process.env.URL}/api/public-chats/${params.id}`, {
			method: 'POST',
			body: JSON.stringify(message),
		})
			.then((res) => {
				res.json()
				revalidateTag('content')
				form = new FormData()
			})
			.catch((err) => console.error(err))
	}

	return (
		<div className=' px-2'>
			<div className=' text-center py-4 border-b border-slate-700'>
				{/* profile pic */}
				<Avatar user={receiver} size={60} />
				<p>{receiver?.username}</p>
			</div>
			<div className=' '>
				{ chat?.messages.map( async(message: any) => {
					const sender = await getUserById(message.sender)
					return (
						<div
							key={message._id}
							className=' flex justify-between items-center w-full py-2'
						>
							<Avatar user={sender} size={40} />
							<p className='flex-1 px-2'>{message.content}</p>
							<p>{moment(message.createdAt).fromNow()}</p>
						</div>
					)})}
			</div>
			<form action={submitMessage}>
				<div className='fixed bottom-8 flex items-center justify-between space-x-2 w-full pr-4'>
					<input
						name='content'
						type='text'
						className=' py-2 w-full rounded px-2 bg-slate-800 text-white border border-slate-600  outline-none'
						placeholder='say what you want to say'
					/>
					<button
						className='flex-1  px-4 py-2 border border-slate-600 rounded  shadow-lg'
						type='submit'
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	)
}
