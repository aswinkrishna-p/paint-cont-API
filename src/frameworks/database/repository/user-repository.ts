import IUserRepository from "../../../useCase/interface/repositoryintrface/userRepository";
import { Iuser } from "../../../entity/userEntity"
import userModel from "../models/userModel";

class userRepository implements IUserRepository{
    async saveuser(user:Iuser){
        const newUser = new userModel(user)
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
}


export default userRepository