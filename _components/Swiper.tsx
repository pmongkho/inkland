'use client'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'


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
							className='h-full w-full -z-10'
						/>
					</SwiperSlide>
				))}
			
		</Swiper>
	)
}