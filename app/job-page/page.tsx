import { JobCard } from '@/_components/JobCard'
import { JobDocument } from '@/_models/Job'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/options'

export default async function JobPage() {

	const session = await getServerSession(authOptions)
	const jobs = await fetch(`${process.env.URL}/api/jobs`, {
		cache: 'no-cache',
		next: { tags: ['jobs'] },
	})
		.then((res) => res.json())
		.catch((err) => console.error(err))

	return (
		<div className=''>

			{jobs?.map((item:JobDocument) => (
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
