import mongoose from 'mongoose'
const url = process.env.NEXT_APP_MONGO_URI as string

const startDb = async () => {
	try {
		await mongoose.connect(url)
	} catch (error) {
		console.error(error)
	}
}

export default startDb
