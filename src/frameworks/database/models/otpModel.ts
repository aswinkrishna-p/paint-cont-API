import { Iotp } from "../../../entity/otp";

import mongoose, {Schema} from "mongoose";


const OtpSchema:Schema<Iotp> = new mongoose.Schema({
    email:String,
    otp:{
        required:true,
        type:String     
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now,
    },
    expiresAt:{
        type:Date,
        default:Date.now,
        expires:10*60,
        required:true
    }
})

const OTP = mongoose.model<Iotp>('OTP',OtpSchema)
export default OTP