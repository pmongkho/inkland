import { JobCard } from '@/_components/JobCard'
import { getServerSession } from 'next-auth'

import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/options'
import { getAllJobs } from '../api/jobs/route'

export default async function JobPage() {
	const session = await getServerSession(authOptions)
	const jobs = await getAllJobs()

	return (
		<div className='pt-20 pb-20'>
			{jobs?.map((item): any => (
				<JobCard
					key={item?._id}
					author={item.author}
					data={item}
					user={session?.user}
				/>
			))}
		</div>
	)
}
