import MessageList from '@/_components/MessengerView'
import React from 'react'

export default function Messenger() {
	return (
		<div className='[&>*]:block [&>*]:w-full  text-center'>
			<div className=' z-20 bg-slate-800 border-slate-700 border-b [&>*]:mb-2 text-white [&>*]:w-full fixed px-2 py-4'>
				{/* <h1 className='text-3xl pb-4'>Chats</h1> */}
				<input
					className=' bg-slate-800 text-white border border-slate-700  outline-none py-2 rounded pl-2'
					type='search'
					placeholder='Search Messages'
				/>
			</div>
			<MessageList />
		</div>
	)
}
