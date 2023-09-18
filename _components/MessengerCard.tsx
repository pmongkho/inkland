import Image from 'next/image';

export default function MessengerCard() {
	return (
		<div className='p-2 flex items-center justify-between w-screen mb-2 hover:bg-slate-100 '>
			<div className='relative w-full'>
				<Image
					width={200}
					height={200}
					className='rounded-full '
					src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80'
					alt='profile pic'
				/>
				<span className='top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full'></span>
			</div>

			<div className='[&>*]:block flex flex-wrap justify-start  w-max-[50vw] px-4'>
				<big>Jane Doe</big>
				<small className='text-left h-10 line-clamp-2'>
					Lorem, ipsum dolor sit amet consec adipisicing elit. Eius harum a rem
					error nemo odit voluptatum maxime fugit nesciunt repudiandae eos
					obcaecati, omnis sequi ea earum consequatur eveniet fuga voluptatem?
				</small>
			</div>
			<small className=' w-full'>11:11 PM</small>
		</div>
	)
}
