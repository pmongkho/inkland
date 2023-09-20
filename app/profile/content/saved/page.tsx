import { getSavedByUser } from '@/app/api/auth/users/route'
import { JobCard } from '@/_components/JobCard'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../api/auth/[...nextauth]/options'

export default async function Saved({ params }: any) {
	const session = await getServerSession(authOptions)
	const jobs = await fetch(
		`${process.env.URL}/api/auth/users/saved/${session?.user.id}`,
		{
			cache: 'no-cache',
			next: { tags: ['saved'] },
		}
	)
		.then((res) => res.json())
		.catch((err) => console.error(err))
	  
	
	if (jobs.length === 0) {
			return <h1 className=' px-2 py-2'>No Data Found</h1>
		}
	return (
		<>
			<div className=''>
				{jobs?.map(  (item: any) => 
						(
						<JobCard
							key={item?._id}
							data={item}
							author={item?.author}
							user={session?.user}
						/>
					)
				)}
			</div>{' '}
		</>
	)
}
