import { createJob, getJobs } from '@/_lib/Jobs'
import Job from '@/_models/Job'
import UserModel from '@/_models/User'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: Request) => {
	return createJob(request)
}

export const GET = async () => {
	return await getJobs()
}



