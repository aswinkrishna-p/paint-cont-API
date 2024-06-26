import { Iuser } from "../../../entity/userEntity";

import mongoose,{Schema} from "mongoose";


const userSchema:Schema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'please enter valid name'],
    
    },
    email:{
        type:String,
        required:[true,'please enter valid email'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'password must include 6 characters'],
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    profile: {
        type:String,
    },
    phone:{
        type:Number
    },
    address:{
        houseNo:Number,
        location:String,
        pin:Number
    }
})



const userModel = mongoose.model<Iuser>('User',userSchema)
export default userModel