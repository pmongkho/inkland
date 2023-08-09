import Image from 'next/image'
import React from 'react'
import hero from '../_media/images/hero.jpeg'

export default function Hero() {
	return (
		<div className='relative '>
			<h1 className='absolute ml-2 top-[50%] text-white text-8xl'>
				Inkland
			</h1>

			<Image className='' src={ hero } alt='hero'/>
		</div>
	)
}
