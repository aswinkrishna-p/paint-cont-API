import { Iuser } from "../../../entity/userEntity"
import PostModel from "../models/postModel";
import userModel from "../models/userModel";
import { Document, Types } from "mongoose";
import { Iotp } from "../../../entity/otp";
import { SlotInterface } from "../../../entity/slotsEntity";
import SlotModel from "../models/slotsModel";
import stripe from "../../services/stripe";
import paymentModel from "../models/paymentModel";

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
   console.log(existingUser);
   
     if(existingUser){
        return {
          success:false,
          data:existingUser,
          message: 'user already existes'
        }
     }else{
        return {
         success:true,
        }
     }
 }
 
 async login(email: string) {
   try {
       const user = await userModel.findOne({ email });
       return user;
   } catch (error) {
       console.log(error);
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

 async  bookslot(userId:string,slotId:string){
   try {

      

      const slot = await SlotModel.findById(slotId)

      if (!slot) {
         return {
            success:false,
            message:'Slot not found'
         }
       }

       if(slot.amount){
         const session = await stripe.checkout.sessions.create({
            line_items: [{
               price_data: {
                 currency: 'inr',
                 product_data: {
                   name: `Slot booking for ${slot.date}`,
                 },
                 unit_amount: slot.amount * 100,
               },
               quantity: 1,
             }],
             mode: 'payment',
             success_url:'http://localhost:3000/payment-success',
             cancel_url:'http://localhost:3000',
             billing_address_collection: 'required',
         });


         const paymentData = new paymentModel({
            userId:userId,
            painterId:slot.painterId,
            amount:slot.amount,
            paymentId:session.id
         })

         await paymentData.save()

         return {
            success:true ,
            data:session.id
       }

      }
      
   } catch (error) {
      console.log(error);
      
   }
 }





}


export default userRepository