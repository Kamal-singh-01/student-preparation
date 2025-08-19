import mongoose from "mongoose";

export const connectDB = async()=> {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to DataBase")
    } catch (error) {
        console.log("error while connecting Database",error)
        process.exit(1)
    } 
}