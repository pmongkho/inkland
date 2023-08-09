import startDb from '@/_lib/db'
import UserModel from '@/_models/userModel'
import { NextResponse } from 'next/server'

export const POST = async (req: Request): Promise<NextResponse> => {
	await startDb()
	const body = await req.json()
	

	const oldUser = await UserModel.findOne({ email: body.email })
	if (oldUser)
		return NextResponse.json(
			{ error: 'email is already in use!' },
			{ status: 422 }
		)
	const user = await UserModel.create({ ...body })

	return NextResponse.json({
		user: {
			id: user._id.toString(),
			image: user.image,
			email: user.email,
			name: user.name,
			userRole: user.userRole,
			phone: user.phone,
			zipcode: user.zipcode,
		},
	})
}
export async function getUser(email: Request){
	try {await startDb()
		email = await email.json()
		
		const user = await UserModel?.findOne({ email: email })

		return user
		 
	} catch (error) {
		throw error
	}
}
export async function getUserById(id: Request){
	try {
		await startDb()		
		const user = await UserModel.findById(id)
		return user
		 
	} catch (error) {
		throw error
	}
}
export async function userEmailExists(email: string| Request|undefined){
	try {
		await startDb()

		const user = await UserModel?.findOne({email:email})
		if (user) {
			return true
		} else {
			return false
		}
	} catch (error) {
		throw error
	}
}
