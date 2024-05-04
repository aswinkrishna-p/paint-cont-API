import { Iotp } from "../../../entity/otp";
import otpModel from "../models/otpModel"





 class OtpRepository {

    
    // save otp
    async saveOtp(newUser: Iotp) {
        try {
            await otpModel.findOneAndDelete({email:newUser.email})
            const newuser = new otpModel(newUser)
            const result = await newuser.save()
            return result
        } catch (error:any) {
            throw(error)
        }
    }

    //  find user in otp model
     async findUser(email: string){
        try {
            let result = await  otpModel.findOne({email})
            if(result) {
                return {
                    success : true,
                    result
                }
            } else {
                return {
                    success: false,
                    message: 'User not found!'
                }
            }
        } catch (error:any) {
            throw(error)
        }    
    }

    //  find and delete user

    // async findAndDelete(email: string, verificationCode: string){
    //     try {
    //         const result =  await otpModel.findOneAndDelete({email,otp:verificationCode})
    //         if(result){
    //             return true
    //         }else{
    //             return false
    //         }
    //     } catch (error) {
    //         throw(error)
    //     }
    // }
}

export default OtpRepository