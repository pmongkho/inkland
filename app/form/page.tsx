'use client'

import '@uploadthing/react/styles.css'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { UploadButton } from '@uploadthing/react'
import { OurFileRouter } from '../api/uploadthing/core'

export default function Form() {
	const { data: session } = useSession()
	const router = useRouter()
	const [uploadFiles, setUploadFiles] = useState<{
				fileUrl: string
				fileKey: string
		  }[]
		| undefined
		>([])
	

	const addConsultation = async (data: FormData) => {
		try {
			const photos = uploadFiles
			const style = data.get('style')?.toString()
			const placement = data.get('placement')?.toString()
			const comments = data.get('comments')?.toString()
			const date = new Date().toString()
			const user_id = session?.user.id as string

			const consultation = {
				style,
				placement,
				photos,
				comments,
				date,
				user_id,
			}

			const res = await fetch('/api/consultations', {
				method: 'POST',
				body: JSON.stringify(consultation),
			}).then((response) => console.log(response))
			router.replace('/')
		} catch (error) {
			throw error
		}
	}

	return (
		<div className='pt-8 pb-20 flex justify-center'>
			<div className=''>
				<h1 className='  text-3xl'>Consultation Form</h1>
				<small>
					please fill out this form so we can help you get that tattoo
				</small>
				<form
					className='[&>*]:my-2 [&>*]:block [&>*]:w-full [&>*]:p-2 [&>*]:rounded'
					action={addConsultation}
				>
					<input type='text' name='name' value={session?.user.name} required />
					<input
						type='text'
						name='phone'
						value={session?.user.phone}
						required
					/>
					<input
						type='email'
						name='email'
						value={session?.user.email}
						required
					/>
					<input
						type='text'
						name='zipcode'
						value={session?.user.zipcode}
						required
					/>
					<input type='text' name='style' placeholder='Style' required />
					<input
						type='text'
						name='placement'
						placeholder='Placement'
						required
					/>
					<p>Reference Photos</p>
					<div className=' flex items-center justify-evenly'>
						{uploadFiles?.map((file) => (
							<Image
								src={file.fileUrl}
								alt='ref photo'
								width={100}
								height={100}
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
					<textarea name='comments' placeholder="Add'l. Comments" />
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
