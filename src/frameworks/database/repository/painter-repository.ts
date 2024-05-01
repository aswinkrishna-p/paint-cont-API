import { Ipainter } from "../../../entity/painterEntity";
import painterModel from "../models/painterModel";




class painterRepository {
    async saveuser(user:Ipainter){
        const newUser = new painterModel(user)
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
}

export default painterRepository