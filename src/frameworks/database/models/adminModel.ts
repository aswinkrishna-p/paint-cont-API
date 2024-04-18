import { IAdmin } from "../../../entity/AdminEntity";

import mongoose,{Schema} from "mongoose";


const AdminSchema:Schema = new mongoose.Schema({

    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

const AdminModel = mongoose.model<IAdmin>('admin',AdminSchema)
export default AdminModel