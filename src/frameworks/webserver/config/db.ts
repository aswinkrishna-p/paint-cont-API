import mongoose from "mongoose";
require('dotenv').config()


const DB_connect:string = process.env.MONGO_url || ''


//database connection
const connectDb = async ()=>{
    try{
        const connection = await mongoose.connect(DB_connect);
        console.log(`Db connected ${connection.connection.host}`);
    }catch(error:any){
        console.log(error.message);
        
    }
}

export default connectDb