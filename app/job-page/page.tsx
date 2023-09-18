import { JobCard } from '@/_components/JobCard'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/options'
import axios from 'axios'
import { getJobs } from '@/_lib/Jobs'

export default async function JobPage() {

	const session = await getServerSession(authOptions)
	const jobs = await getJobs()

	return (
		<div className='pt-20'>

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
