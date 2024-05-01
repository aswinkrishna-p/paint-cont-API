import { Ipainter } from "../../../entity/painterEntity";

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
})



const painterModel = mongoose.model<Ipainter>('Painter',userSchema)
export default painterModel