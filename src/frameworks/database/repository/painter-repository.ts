import { Ipainter } from "../../../entity/painterEntity";
import painterModel from "../models/painterModel";
import { Document, Types } from "mongoose";
import { Iotp } from "../../../entity/otp";
import PostModel from "../models/postModel";
import userModel from "../models/userModel";
import SlotModel from "../models/slotsModel";
import { SlotInterface } from "../../../entity/slotsEntity";
import paymentModel from "../models/paymentModel";



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



 async updatepass(email:string,newpass:string){
   try {
      
      const update = await painterModel.findOneAndUpdate({email:email},{$set:{password:newpass}},{new:true})
      console.log(update,'updated painter in model');
      
      if(update){
         return {
            success:true,
            message:'password updated'
         }
      }else{
         return{
            success:false,
            message:'error in updating password'
         }
      }
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

      const slot = await SlotModel.find({painterId:painterid})
      if(!painter){
         return {
            success:false,
            message:'painter not found',
         }
      }else{
         return {
            success:true,
            data:painter,slot,
            message:'painter details fetched successfully',
         }
         
      }
   } catch (error) {
      console.log(error);
      
   }
 }

 async fetchDashBoard(painterId:string){
   try {
      
      const slot = await SlotModel.find({painterId})
      const payments = await paymentModel.find({painterId}).populate('userId' , 'username')

      if(slot && payments){
         return{
            success:true,
            data:{slot,payments},
            message:'dash data fetched successfully'
         }
      }else{
         return{
            success:false,
            message:'error in fetching dash data'
         }
      }
   } catch (error) {
      console.log(error);
      
   }
 }

 async saveslots(painterId:string,slots:SlotInterface[]){
   try {

      const { date, amount } = slots[0]
      console.log(date);
      console.log(amount);
      
      const existingSlot = await SlotModel.findOne({ painterId, date,});

      if (existingSlot) {
        return { message: 'Slot already exists' };
      }

      const newSlot = new SlotModel({
         date,
         amount, // Add the amount field
         painterId,
       });
   
       await newSlot.save();
       
       return {
         success:true,
          message: 'Slot created successfully',
           slot: newSlot 
         };
   } catch (error) {
      console.log(error);
      
   }
 }

 async editSlots(date:string,amount:string , slotId:string){
   try {
      
      const editslot = await SlotModel.findByIdAndUpdate(slotId,{date,amount},{new:true})

      if(editslot){
         return{
            success:true,
            message:'slot edited successfully'
         }
      }else{
         return{
            success:false,
            message:'slot not found'
         }
      }
   } catch (error) {
      console.log(error);
      
   }
 }

 async deleteSlot(slotId:string){
   try {
      
      const deleted = await SlotModel.findByIdAndDelete(slotId)

      if(deleted){
         return{
            success:true,
            message:'slot deleted successfully'
         }
      }else{
         return{
            success:false,
            message:'slot not found'
         }
      }
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