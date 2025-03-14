import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
	const token = await getToken({ req })

	// Check if user is authenticated
	if (token) {
		const { pathname } = req.nextUrl

		// Allow API calls and static assets to pass through
		if (pathname.startsWith('/api') || pathname.startsWith('/_next')) {
			return NextResponse.next()
		}

		// Check if user is missing profile fields

		// Redirect to profile setup if profile is incomplete
		if (token.role === 'BLANK' && pathname !== '/profile-setup') {
					console.log('🔄 Redirecting to profile setup...')

			return NextResponse.redirect(new URL('/profile-setup', req.url))
		}
	}

	return NextResponse.next()
}

// Apply middleware to protected routes
export const config = {
	matcher: [
		'/',
		'/dashboard',
		'/job-page',
		'/messenger/:path*',
		'/profile/:path*',
		'/profile-setup'
	],
}
