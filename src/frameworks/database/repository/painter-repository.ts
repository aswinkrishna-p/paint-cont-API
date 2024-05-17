import { Ipainter } from "../../../entity/painterEntity";
import painterModel from "../models/painterModel";
import { Document, Types } from "mongoose";
import { Iotp } from "../../../entity/otp";



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


}

export default painterRepository