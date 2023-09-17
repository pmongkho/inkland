import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '../_components/Header'
import AuthProvider from '@/_lib/AuthProvider'
import { ReduxProvider } from '../_redux/provider'

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
			<AuthProvider>
				<ReduxProvider>
					<body className={`${inter.className} bg-slate-800 relative text-white `}>
						<Header />
								
						<main className=' h-full'>{children}</main>
					</body>{' '}
				</ReduxProvider>
			</AuthProvider>
		</html>
	)
}
