import { Iuser } from "../../../entity/userEntity"
import PostModel from "../models/postModel";
import userModel from "../models/userModel";
import { Document, Types } from "mongoose";
import { Iotp } from "../../../entity/otp";

class userRepository{
   async saveuser(user:| Iuser  | (Document<unknown, {}, Iotp> & Iotp & { _id: Types.ObjectId }) | undefined){

      const data ={
         username:user?.username,
         email:user?.email,
         password:user?.password
      }
     const newUser = new userModel(data)
    await newUser.save()
    newUser.password=''
     return {
      status:200,
      success:true,
      data:newUser,
      message:'user registerd success'
     }
 }

  async findByEmail(email: string) {
     const existingUser =  await userModel.findOne({email})

     if(existingUser){
        return {
          status:200,
          success:true,
          data:existingUser,
          message: 'user already existes'
        }
     }else{
        return null
     }
 }

 async addAddress(newUserAddress:any,phoneNo:Number,userId:string){
   try {
      console.log('inside reepoo');
      
      const user = await userModel.findById(userId)

      if(!user){
         return {
            success:false,
            message:'user not found'
         }
      }else{

         user.address = newUserAddress
      }

      const updatedUser = await userModel.findByIdAndUpdate(userId, { phone: phoneNo, address: user.address }, { new: true });
      
      if(updatedUser){
         return{
            success:true,
            message:'user address added'
         }
      }else{
         return{
            success:false,
            message:'error in adding address'
         }
      }
   } catch (error) {
      console.log(error);
      
   }
 }

 async saveprofilepic (userId:string, imageUrl:string){
   try {
      const photoSaved = await userModel.findOneAndUpdate(
         { _id: userId },
         { $set: { profile: imageUrl } },
         { new: true }
     );
     // console.log(photoSaved);
     return photoSaved;
   } catch (error) {
      console.log(error);
      
   }
 }

 async allPosts(){
   try {
      
      const allposts = await PostModel.find().populate("painterId")
      // console.log(allposts,'all postss ');
      return allposts
   } catch (error) {
      console.log(error);
      
   }
 }



}


export default userRepository