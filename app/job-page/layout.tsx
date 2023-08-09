import React from 'react'

export default function JobLayout({ children,}: {
        children:React.ReactNode
    }) {
    
    return (
			<>
				<div className='flex w-screen h-full bg-slate-100 text-left'>
					<div className='z-10 flex items-center justify-between bg-slate-100 fixed w-full shadow-lg'>
						<div className='  pl-4 my-1 py-4 flex items-center justify-start [&>*]:block'>
							<input
								className='ml-2 py-2 px-4 rounded-l'
								type='search'
								placeholder='Search for tattoos'
							/>
						</div>
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
					</div>
				
            </div>
            {children}
			</>
		)
}
