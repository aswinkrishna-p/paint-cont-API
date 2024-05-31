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
    profile: {
        type:String,
    },
    phone: {
        type: String,  
    },age: {
        type: Number,
    },
    experienceYears: {
        type: Number,
    },
    specialised: {
        type: [String],
        default: []
    },
    aboutMe: {type :String},
    location:{type:String}
})



const painterModel = mongoose.model<Ipainter>('Painter',userSchema)
export default painterModel