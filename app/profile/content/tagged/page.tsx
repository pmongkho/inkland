import { getSavedByUser, getUserTagged } from '@/app/api/auth/users/route'
import { JobCard } from '@/_components/JobCard'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../api/auth/[...nextauth]/options'

export default async function Tagged({ params }: any) {
	const session = await getServerSession(authOptions)
	const jobs = await getUserTagged(session?.user.id as Request)
	  if (jobs.length === 0) {
			return <h1>No Data Found</h1>
		}
  return (
		<>
			<div className='pb-20'>
				{jobs?.map((item: any) => (
					<JobCard
						key={item?._id}
						data={item}
						author={item?.author}
						user={session?.user}
					/>
				))}
			</div>{' '}
		</>
	)
}
