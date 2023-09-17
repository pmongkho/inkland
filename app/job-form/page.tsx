'use client'

import { UploadButton } from '@uploadthing/react'
import '@uploadthing/react/styles.css'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import tattooStyles from '../../_lib/tattooStyles.json'
import { OurFileRouter } from '../api/uploadthing/core'

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

			const res = await fetch('/api/jobs', {
				method: 'POST',
				body: JSON.stringify(job),
			}).then((response) => console.log(response))
			router.replace('/')
		} catch (error) {
			throw error
		}
	}

	return (
		<div className='pt-8 pb-20 flex text-center justify-center'>
			<div className=''>
				<h1 className='  text-3xl'>Tattoo Consultation Form</h1>
				<small>help us understand what tatoo you want.</small>

				{user?.role === 'ARTIST' && (
					<div className='my-4'>
						<big className='block'>Since you&apos;re an artist choose.</big>
						<div className='flex justify-evenly'>
							<button className='btn mx-2' onClick={() => setRole('CLIENT')}>
								as client?
							</button>
							<button className='btn mx-2' onClick={() => setRole('ARTIST')}>
								as artist?
							</button>
						</div>
					</div>
				)}

				<form
					className='[&>*]:my-2 [&>*]:block [&>*]:w-full [&>*]:p-2 [&>*]:rounded'
					action={addJob}
				>
					<input
						type='text'
						name='subjectMatter'
						placeholder='Subject Matter (What is the tattoo of?)'
						required
					/>

					{/* <input type='text' name='style' placeholder='Style' list='styles'required /> */}

					<select name='style' className='' placeholder='Style'>
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
						placeholder='Placement (Where on the body? be specific!)'
						required
					/>

					<p>Reference Photos</p>

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
							alert('Upload Completed')
						}}
						onUploadError={(error: Error) => {
							// Do something with the error.
							alert(`ERROR! ${error.message}`)
						}}
					/>

					{role === 'ARTIST' && (
						<>
							<input
								type='number'
								name='price'
								datatype='currency'
								placeholder='Price $$$'
							/>
							<input type='text' name='duration' placeholder='Duration' />
						</>
					)}
					<textarea name='addlInfo' placeholder="Add'l. Comments?" />

					<button
						type='submit'
						className=' text-white bg-blue-950 border border-gray-400'
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	)
}
