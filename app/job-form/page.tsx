'use client'

import { UploadButton } from '@uploadthing/react'
import '@uploadthing/react/styles.css'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import tattooStyles from '../../_lib/data/tattooStyles.json'
import { OurFileRouter } from '../api/uploadthing/core'
import { revalidateTag } from 'next/cache'

export default function JobForm() {
	const { data: session } = useSession()
	const user = session?.user
	console.log(user)
	const router = useRouter()
	const [uploadFiles, setUploadFiles] = useState<
		| {
				fileUrl: string
				fileKey: string
		  }[]
		| undefined
	>([])
	const [role, setRole] = useState(user?.role)

	const addJob = async (data: FormData) => {
		try {
			const author = user?.id
			const subjectMatter = data.get('subjectMatter')?.toString()
			const style = data.get('style')?.toString()
			const placement = data.get('placement')?.toString()
			const photos = uploadFiles
			const addlInfo = data.get('addlInfo')?.toString()
			const price = data.get('price')?.toString()
			const duration = data.get('duration')?.toString()

			const job = {
				author,
				tattoo: {
					subjectMatter,
					style,
					placement,
					photos,
					addlInfo,
					price,
					duration,
				},
			}

			await fetch('/api/jobs', {
				method: 'POST',
				body: JSON.stringify(job),
			}).then((res) => {
				res.json()
				revalidateTag('jobs')
			})

			router.replace('profile/content/my-stuff')
		} catch (error) {
			throw error
		}
	}

	return (
		<div className='pt-8 pb-20 flex text-center items-center justify-center'>
			<div className=''>
				<h1 className='  text-3xl'>Tattoo Consultation Form</h1>
				<small>help us understand what tatoo you want.</small>

				{user?.role === 'ARTIST' && (
					<div className='my-4'>
						<big className='block'>Since you&apos;re an artist, choose.</big>

						<div className='flex justify-evenly space-x-2'>
							<button
								className={` w-full mt-2 py-2 border rounded ${
									role === 'CLIENT' ? ' border-cyan-500' : ' border-slate-700'
								}`}
								onClick={() => setRole('CLIENT')}
							>
								Client Form
							</button>
							<button
								className={` w-full  mt-2 py-2 border rounded ${
									role === 'ARTIST' ? ' border-cyan-500' : ' border-slate-700'
								}`}
								onClick={() => setRole('ARTIST')}
							>
								Artist Form
							</button>
						</div>
					</div>
				)}

				<form
					className='[&>*]:my-2 [&>*]:block [&>*]:w-full [&>*]:p-2 [&>*]:rounded'
					action={addJob}
				>
					<div className=' flex items-center justify-evenly '>
						{uploadFiles?.map((file) => (
							<Image
								key={file.fileKey}
								src={file.fileUrl}
								alt='ref photo'
								width={100}
								height={100}
								className=' inline mx-2'
							/>
						))}
					</div>

					<UploadButton<OurFileRouter>
						endpoint='imageUploader'
						onClientUploadComplete={(res) => {
							// Do something with the response
							setUploadFiles(res)
						}}
						onUploadError={(error: Error) => {
							// Do something with the error.
							alert(`ERROR! ${error.message}`)
						}}
					/>
					<input
						type='text'
						name='subjectMatter'
						className=' bg-slate-800 text-white border border-slate-600  outline-none'
						placeholder='Subject Matter (What is the tattoo of?)'
						required
					/>

					<select
						name='style'
						className=' bg-slate-800 text-white border border-slate-600  outline-none'
						placeholder='Style'
					>
						<option selected>Choose Style</option>
						{tattooStyles.map((style) => (
							<option key={style.style} value={style.style}>
								{style.style}
							</option>
						))}
					</select>

					<input
						type='text'
						name='placement'
						className=' bg-slate-800 text-white border border-slate-600  outline-none'
						placeholder='Placement (Where on the body? be specific!)'
						required
					/>

					{role === 'ARTIST' && (
						<>
							<input
								type='number'
								name='price'
								datatype='currency'
								placeholder='Price $$$'
								className=' bg-slate-800 text-white border border-slate-600  outline-none'
							/>
							<input
								type='text'
								name='duration'
								className=' bg-slate-800 text-white border border-slate-600  outline-none'
								placeholder='Duration'
							/>
						</>
					)}
					<textarea
						name='addlInfo'
						className=' bg-slate-800 text-white border border-slate-600  outline-none'
						placeholder='What do you want the job to say?'
					/>

					<button type='submit' className=' text-white  border border-cyan-500'>
						Submit
					</button>
				</form>
			</div>
		</div>
	)
}
