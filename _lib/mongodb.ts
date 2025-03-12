import { MongoClient } from 'mongodb'

const uri = process.env.NEXT_APP_MONGO_URI // Ensure this is set in your .env file
const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (!process.env.NEXT_APP_MONGO_URI) {
	throw new Error('⚠️ NEXT_APP_MONGO_URI is missing in your environment variables!')
}

if (process.env.NODE_ENV === 'development') {
	if (!(global as any)._mongoClientPromise) {
		client = new MongoClient(uri!, options)
		;(global as any)._mongoClientPromise = client.connect() // Ensure you call .connect()
	}
	clientPromise = (global as any)._mongoClientPromise
} else {
	client = new MongoClient(uri!, options)
	clientPromise = client.connect() // Ensure .connect() is explicitly called
}

export default clientPromise
