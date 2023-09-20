import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { JobCard } from '@/_components/JobCard'
import { getServerSession } from 'next-auth'

export default async function MyStuff() {
	const session = await getServerSession(authOptions)
	const jobs = await fetch(
		`${process.env.URL}/api/auth/users/my-stuff/${session?.user.id}`,
		{
			// cache: 'no-cache',
			// next: { tags: ['my-stuff'] },
		}
	)
		.then((res) => res.json())
		.catch((err) => console.error(err))

	if (jobs.length === 0) {
		return <h1 className=' px-2 py-2'>No Data Found</h1>
	}
	return (
		<div className=''>
			{jobs?.map((item: any) => (
				<JobCard
					key={item?._id}
					data={item}
					author={item?.author}
					user={session?.user}
				/>
			))}
		</div>
	)
}
