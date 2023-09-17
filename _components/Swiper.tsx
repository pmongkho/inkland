'use client'
import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import Image from 'next/image'


export default function SwiperPics({ photos }: any) {
	return (
		<Swiper
			pagination={{
				dynamicBullets: true,
			}}
			modules={[Pagination]}
			className=''
		>
			
				{photos.map((item: any) => (
					<SwiperSlide>
						<Image
							src={item.fileUrl as string}
							alt='reference pic'
							width={50}
							height={50}
							className='h-full w-full'
						/>
					</SwiperSlide>
				))}
			
		</Swiper>
	)
}