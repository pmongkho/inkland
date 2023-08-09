import mongoose from 'mongoose';
const url = process.env.MONGO_URI as string
let connection: typeof mongoose;

const startDb = async () => {
    try {
        await mongoose.connect(url)
    } catch (error) {
        console.error(error)
    }
    return connection
}

export default startDb