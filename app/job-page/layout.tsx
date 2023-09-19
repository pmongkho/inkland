import React from 'react'

export default function JobLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='relative'>
			<div className='border-b border-slate-700 px-2 py-4 flex justify-between items-center [&>*]:block z-10 w-full bg-slate-800'>
				<input
					type='search'
					className=' py-2 px-4 bg-slate-800 text-white border border-slate-600  outline-none rounded'
					placeholder='search tattoos'
				/>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					className='w-8 h-8'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75'
					/>
				</svg>
			</div>

			{children}
		</div>
	)
}
