'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import hero from '../_media/images/hero.jpeg'
import svg1 from '../_media/svg/svgtattoo.svg'
import svg2 from '../_media/svg/svgtattooblue.svg'
import svg3 from '../_media/svg/svgblack.svg'
const images = [svg1, svg2, svg3]

export default function Hero() {

	return (
		<div className=' '>
	<Image src={svg1} alt='svg1'></Image>
	
		</div>
	)
}
