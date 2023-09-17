import Image from 'next/image'
import React from 'react'
import profile from '../_media/images/profile.jpeg'

export default function MessengerCard() {
	return (
		<div className='p-2 flex items-center justify-between w-screen mb-2 hover:bg-slate-100 '>
			<div className='relative'>
				{/* <Image
					width={200}
					height={200}
					className='rounded-full w-full'
					src={profile}
					alt='profile pic'
				/> */}
				<span className='top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full'></span>
			</div>

			<div className='[&>*]:block '>
				<big>Jane Doe</big>
				<small className=' mx-2 text-left h-10 overflow-y-hidden'>
					Lorem, ipsum dolor sit amet consec adipisicing elit. Eius harum a rem
					error nemo odit voluptatum maxime fugit nesciunt repudiandae eos
					obcaecati, omnis sequi ea earum consequatur eveniet fuga voluptatem?
				</small>
			</div>
			<small className=' w-full'>11:11 PM</small>
		</div>
	)
}
