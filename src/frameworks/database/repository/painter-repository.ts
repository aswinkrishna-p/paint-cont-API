import { Ipainter } from "../../../entity/painterEntity";
import painterModel from "../models/painterModel";
import { Document, Types } from "mongoose";
import { Iotp } from "../../../entity/otp";
import PostModel from "../models/postModel";
import userModel from "../models/userModel";
import SlotModel from "../models/slotsModel";



class painterRepository {
    async saveuser(user:| Ipainter  | (Document<unknown, {}, Iotp> & Iotp & { _id: Types.ObjectId }) | undefined){

         const data ={
            username:user?.username,
            email:user?.email,
            password:user?.password
         }
        const newUser = new painterModel(data)
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
     const existingUser =  await painterModel.findOne({email})

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

 async saveprofilepic (userId:string, imageUrl:string){
   try {
      const photoSaved = await painterModel.findOneAndUpdate(
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

 async savePost(painterId:string,description:string,media:string){
   try {
      
      const newPost = new PostModel({
         painterId:painterId,
         media:media,
         description:description
      }) 

      await newPost.save()
      return newPost
   } catch (error) {
      console.log(error);
      
   }
 }
 async updatePainterDetails(painterid:string,details: Object){
   try {
      
      const painter = await painterModel.findByIdAndUpdate(painterid,details,{new:true})

      if(!painter){
         return {
            success:false,
            message:'painter not found',
         }
      }else{
         return {
            success:true,
            message:'painter details updated successfully',
         }
         
      }
   } catch (error) {
      console.log(error);
      
   }
 }

 async getpainter(painterid:string){
   try {
      const painter = await painterModel.findById(painterid)

      return painter
   } catch (error) {
      console.log(error);
      
   }
 }

 async saveslots(painterid:string,slots:Array<object>){
   try {

      // const { date, startTime, endTime, amount } = slots
      // const existingSlot = await SlotModel.findOne({ painterid, date, start: startTime, end: endTime });

      // if (existingSlot) {
      //   return res.status(409).json({ message: 'Slot already exists' });
      // }
  
   } catch (error) {
      console.log(error);
      
   }
 }

 async addFollowers(painterId:string,userId:string){
   try {
      const painter = await painterModel.findById(painterId)

      if(!painter){
         return {
            success:false,
            message:'painter not found'
         }
      }

      painter.followers = painter.followers || []

      let followed = false

      if(painter.followers.includes(userId)){
         painter.followers = painter.followers.filter((followerId) => followerId !== userId)
      }else{
         painter.followers.push(userId)
         followed = true
      }

      await painter.save()

      return {
         success:true,
         data:followed,
         message:'followed painter successfully'
      }
   } catch (error) {
      console.log(error);
      
   }
 }

 async  followersList(painterid:string){
   try {
      const painter = await painterModel.findById(painterid)
      if(!painter || ! painter.followers){
         return {
            success:false,
            message:'painter not found or no followers'
         }
      }

      const followers = painter.followers

      let list = []

      for(let i =0 ; i<followers.length ; i++){
         const followerid = followers[i]

         const user = await userModel.findById(followerid)

         if(user){
            list.push(user)
         }
      }

      return list
   } catch (error) {
      console.log(error);
      
   }
 }


}

export default painterRepository