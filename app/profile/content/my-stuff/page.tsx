import { getUserPosts } from '@/app/api/auth/users/route'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { JobCard } from '@/_components/JobCard'
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function MyStuff() {
    const session = await getServerSession(authOptions)
	const jobs = await getUserPosts(session?.user.id as Request)
    if (jobs.length === 0) {
			return <h1>No Data Found</h1>
		}
	return (
		<div className=''>
			{jobs.map((item: any) => (
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
