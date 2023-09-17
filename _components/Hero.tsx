import Image from 'next/image'
import React from 'react'
import hero from '../_media/images/hero.jpeg'

export default function Hero() {
	return (
		<div className='relative '>
			<h1 className='absolute ml-2 pb-4 top-[30%] block text-white text-8xl'>Inkland</h1>
			<Image className='' src={hero} alt='hero' />
			<big className='text-5xl mt-4 block'>Bringing tattoo artists and clients together.</big>
		</div>
	)
}
