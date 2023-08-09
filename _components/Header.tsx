'use client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import HamburgerButton from './HamburgerButton'

export default  function Header() {	
	const {data:session} = useSession()
	if (!session?.user) {
		return null
	}

	return (
		<>
			<div>
				<nav className='z-10 mt-40 fixed bottom-0 w-full bg-blue-950 text-white'>
					<ul className='flex items-center justify-between mx-2 py-2 [&>*]:cursor-pointer'>
						<li className='flex '>
							<Link href='/'>
								<div className=' text-cyan-500'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill=''
										viewBox='0 0 24 24'
										strokeWidth={1.5}
										stroke='currentColor'
										className='w-8 h-8'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42'
										/>
									</svg>
								</div>
							</Link>
						</li>
						<li>
							<ul className='flex  [&>*]:mx-4'>
								<Link href='/'>
									<li>
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
												d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
											/>
										</svg>
									</li>
								</Link>

								<Link href='/job-page'>
									<li>
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
												d='M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z'
											/>
										</svg>
									</li>

									{/*<li>
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
													d='M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5'
												/>
											</svg>
										</li>*/}
								</Link>
								<Link href='/form'>
									<li>
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
												d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
											/>
										</svg>
									</li>
								</Link>
								<Link href='/messenger'>
									<li>
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
												d='M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155'
											/>
										</svg>
									</li>
								</Link>
							</ul>
						</li>
						<li>
							<HamburgerButton />
						</li>
					</ul>
				</nav>
			</div>
		</>
	)
}
