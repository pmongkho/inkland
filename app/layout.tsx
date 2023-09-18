import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '../_components/Header'
import Provider from '@/_lib/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Inkland',
	description: 'Bringing tattoo artists and clients together.',
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<Provider>
				<body
					className={`${inter.className} bg-slate-800 relative text-white `}
				>
					<Header />
					<main className=' pt-14'>{children}</main>
				</body>{' '}
			</Provider>
		</html>
	)
}
