import Image from 'next/image'
import React from 'react'

export default function Avatar({user, size}:any) {
  return (
		<div
			className={`relative flex justify-center items-center w-min-[${size} px]`}
		>
			<Image
				className='relative rounded-full z-0'
				src={user?.image ? user?.image : user?.profile?.image}
				alt='profile pic'
				width={size}
				height={size}
			/>

			{user?.role === 'ARTIST' && (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='rgb(6 182 212)'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					className={`w-4 h-4 absolute -top-1 -right-1 text-white`}
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
					/>
				</svg>
			)}
		</div>
	)
}
