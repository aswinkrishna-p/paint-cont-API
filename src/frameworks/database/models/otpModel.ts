import { Iotp } from "../../../entity/otp";

import mongoose, {Schema} from "mongoose";


const OtpSchema:Schema = new mongoose.Schema({
    username:{
      type:String,
      required:true,
    },
    email:{
      type:String,
      required:true,
    },
    password:{
      type:String,
      required:true,
    },
    otp:{
        type:String,     
        required:true,
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

const OTPModel = mongoose.model<Iotp>('OTP',OtpSchema)
export default OTPModel