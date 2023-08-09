import React from 'react'
import { JobCard } from './JobCard'

export default function UserContent({ consultations, user }: any) {
	return (
		<div className='pb-20'>
			{consultations.map((item: any) => (
				<JobCard key={item?._id} data={item} user_id={item.user_id} />
			))}
		</div>
	)
}
