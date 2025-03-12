import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
	const pathname = req.nextUrl.pathname

	// Exclude authentication routes from middleware protection
	const authRoutes = [
		'/api/auth',
		'/api/auth/callback/email',
		'/api/auth/magic-link',
	]
	if (authRoutes.some((route) => pathname.startsWith(route))) {
		return NextResponse.next()
	}

	// Protected routes
	const protectedPaths = [
		'/',
		'/job-page',
		'/job-form',
		'/signup',
		'/messenger/**/*',
		'/profile/**/*',
	]

	const isPathProtected = protectedPaths?.some((path) => pathname == path)
	const res = NextResponse.next()

	if (isPathProtected) {
		const token = await getToken({ req })

		if (!token) {
			const url = new URL(`/login`, req.url)
			url.searchParams.set('callbackUrl', pathname)
			return NextResponse.redirect(url)
		}
	}

	return res
}
