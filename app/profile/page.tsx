import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/options'
import { getAllConsultationsUserLiked } from '../api/consultations/route'
import UserContent from '@/_components/UserContent'

export default async function Profile() {
	const session = await getServerSession(authOptions)
	const consultations = await getAllConsultationsUserLiked(session?.user.id)
	console.log(session?.user.id,consultations)
	return (
		<>
			<div className='flex justify-evenly items-end py-4 border-b-slate-300 border-b'>
				<button>
					<div className={` p-1 bg-slate-300 rounded hover:visible`}></div>
					<small>SAVED</small>
				</button>

				<button>
					<div
						className={`hidden p-1 bg-slate-300 rounded hover:visible`}
					></div>
					<small>MY STUFF</small>
				</button>
				<button>
					<div
						className={`hidden p-1 bg-slate-300 rounded hover:visible`}
					></div>
					<small>TAGGED</small>
				</button>
				<button>
					<div className={`hidden p-1 bg-slate-300 rounded hover:visible`}></div>
					<small>STATS</small>
				</button>
			</div>
			<UserContent consultations={consultations} user={session?.user} />
		</>
	)
}
