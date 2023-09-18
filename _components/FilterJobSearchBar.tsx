import React from 'react'

export default function FilterJobSearchBar() {
  return (
		<div className='flex items-center justify-between bg-slate-800 w-full shadow-lg'>
			<div className=' bg-slate-800  my-1 py-4 flex items-center justify-start [&>*]:block'>
				<input
					className='ml-2 py-2 px-4 rounded-l text-white bg-slate-800 border border-slate-400  outline-none'
					type='search'
					placeholder='Search for tattoos'
				/>
			</div>
			<button>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					className='w-8 h-8 mx-2'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75'
					/>
				</svg>
			</button>
		</div>
	)
}
