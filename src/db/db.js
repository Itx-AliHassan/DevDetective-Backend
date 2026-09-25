import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connect to DB successfully 😎")
    } catch (error) {
        console.error(`Got an error while connected to DB: ${error.message}`)
        process.exit(1)
    }
}

export default connectDb