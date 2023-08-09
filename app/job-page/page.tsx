import { JobCard } from '@/_components/JobCard'
import { getServerSession } from 'next-auth'

import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/options'
import { getAllConsultationsSortedDate } from '../api/consultations/route'

export default async function JobPage() {
	const session = await getServerSession(authOptions)
	const consultation = await getAllConsultationsSortedDate()

	return (
		<div className='pt-20 pb-20'>
			{consultation?.map((item): any => (
				<JobCard
					key={item?._id}
					user_id={item.user_id}
					data={item}
					user={session?.user}
				/>
			))}
		</div>
	)
}
