import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import Avatar from '@/_components/Avatar'
import PublicChat from '@/_models/PublicChat'
import mongoose, { ObjectId } from 'mongoose'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { revalidateTag } from 'next/cache'

export default async function NewMessage({
	params,
}: {
	params: { id: ObjectId }
}) {
	const _user = await fetch(`${process.env.URL}/api/auth/users/${params.id}`)
		.then((res) => res.json())
		.catch((err) => console.error(err))
	const session = await getServerSession(authOptions)
	const sessUser = await fetch(
		`${process.env.URL}/api/auth/users/${session?.user.id}`
	)
		.then((res) => res.json())
		.catch((err) => console.error(err))

	const participants = [sessUser?._id, _user?._id]
	const chatExists = await PublicChat.findOne({ participants: participants })
	if (chatExists) {
		return redirect(`/messenger/message/${chatExists._id}`)
	}

	const submitMessage = async (form: FormData) => {
		'use server'
		const participants = [sessUser?._id, _user._id]
		const content = form.get('content')?.toString()
		const sender = sessUser?._id

		const chat = {
			participants,
			messages: [
				{
					sender,
					content,
				},
			],
		}

		await fetch(`${process.env.URL}/api/public-chats`, {
			method: 'POST',
			body: JSON.stringify(chat),
		})
			.then((res) => {
				res.json()
				revalidateTag('chats')
			})
			.catch((err) => console.error(err))
	}

	return (
		<div className=' px-2'>
			<div className=' text-center py-4 border-b border-slate-700'>
				<Avatar user={_user} size={60} />
				<p>{_user?.username}</p>
			</div>

			{/* <div>
				{chat?.messages.map((message:PublicChatDocument['messages']) => (
					<div>
						<p>{message.sender}</p>
						<p>{message.content}</p>
						<p>{message.createdAt.toISOString()}</p>
					</div>
				))}
			</div> */}

			<form action={submitMessage}>
				<div className='lg:w-[40vw] fixed bottom-8 flex items-center justify-between space-x-2  pr-4 w-full'>
					<input
						type='text'
						name='content'
						className=' w-full py-2 rounded px-2 bg-slate-800 text-white border border-slate-600  outline-none'
						placeholder='say what you want to say'
					/>
					<button
						className=' px-4 py-2 border border-slate-600 rounded  shadow-lg'
						type='submit'
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	)
}
