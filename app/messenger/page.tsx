import MessageList from '@/_components/MessengerView'
import React from 'react'

export default function Messenger() {
	return (
		<div className='[&>*]:block [&>*]:w-full '>
			<div className='[&>*]:mb-2 z-10 text-white [&>*]:w-full fixed bg-blue-950 px-2 py-4 border-b-slate-400'>
				<h1 className='text-3xl'>Chats</h1>
				<input
					className='py-1 px-3 rounded-2xl '
					type='search'
					placeholder='Search Messages'
				/>
			</div>
			<MessageList />
		</div>
	)
}
