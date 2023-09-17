import MessageList from '@/_components/MessengerView'
import React from 'react'

export default function Messenger() {
	return (
		<div className='[&>*]:block [&>*]:w-full '>
			<div className=' bg-slate-800 border-slate-900 border border-b [&>*]:mb-2 z-10 text-white [&>*]:w-full fixed px-2 py-4'>
				<h1 className='text-3xl pb-4'>Chats</h1>
				<input
					className=' bg-slate-800 text-white border  outline-none py-2 rounded pl-2'
					type='search'
					placeholder='Search Messages'
				/>
			</div>
			<MessageList />
		</div>
	)
}
