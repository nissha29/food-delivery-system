import mongoose from 'mongoose'

export default async function connectDB(){
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
    }catch(err){
        console.log(`error occured while connecting to the DB`)
        process.exit(1)
    }
}