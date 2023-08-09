import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { authOptions } from '../api/auth/[...nextauth]/options'

export default async function ProfileLayout({
	children,
}: {
	children: React.ReactNode
    }) {
    const session = await getServerSession(authOptions)
    const user = session?.user
	return (
		<div className=' [&>*]:bg-slate-50  shadow-lg'>
			<div className='  relative flex items-center justify-left p-2 '>
				<Image
					src={user?.image as string}
					alt='default'
					width={100}
					height={100}
					className='rounded-full m-2 mr-4'
				/>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					className='w-6 h-6 absolute top-0 right-0 m-2'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
					/>
				</svg>

				<div className='[&>*]:block'>
					<small>{user?.name}</small>
					<small>{user?.email as string}</small>
					<small>{user?.zipcode as string}</small>
				</div>
			</div>
			<div className='w-[50vw] truncate ml-4'>
				<small>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Exercitationem veritatis tempora obcaecati rem, voluptatem, ipsum
					autem quam sit tempore perspiciatis facilis esse aliquam enim eius!
					Cumque consectetur doloribus sapiente veniam!
				</small>
			</div>
			{/* <div className=''>
				<big>Stats</big>
				<div className='flex justify-evenly text-left'>
					<div className='[&>*]:block'>
						<small>Tattoos won: ###</small>
						<small>Inkland Rating: ###</small>
						<small>Inkland Revenue: ###</small>
					</div>
					<div className='[&>*]:block'>
						<small>1. Black & Grey: ###</small>
						<small>2. Color: ###</small>
						<small>3. Japanese Traditional: ###</small>
					</div>
				</div>
			</div> */}

            { children }
        
		</div>
	)
}
