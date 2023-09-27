'use client'

import { signIn } from 'next-auth/react'
import React from 'react'
import type {
	GetServerSidePropsContext,
	InferGetServerSidePropsType,
} from 'next'
import { getCsrfToken } from 'next-auth/react'

export default function GuestButton({
	csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<form method='post'>
			<input name='csrfToken' type='hidden' defaultValue={csrfToken} />
	
			<button
				type='submit'
				className=' w-full py-4 rounded bg-slate-100 text-black font-semibold my-2 text-center'
				onClick={() =>
					signIn('credentials', {
						email: 'guest@gmail.com',
						name: 'guesty guest',
						image:
							'',
						id: '65138fcaa40bcf44b9577b42',
						username: 'guest',
						role: 'CLIENT',
						zipcode: '66666',
					})
				}
			>
				Guest Login
			</button>
		</form>
	)
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	return {
		props: {
			csrfToken: await getCsrfToken(context),
		},
	}
}