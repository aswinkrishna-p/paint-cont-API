import { Iotp } from "../../../entity/otp";
import otpModel from "../models/otpModel"





 class OtpRepository {

    
    // save otp
    async saveOtp(newUser: Iotp) {
        try {
            await otpModel.findOneAndDelete({email:newUser.email})
            const newuser = new otpModel(newUser)
            const result = await newuser.save()
            console.log(result,'result in otp repoo');
            
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

    async resendOTP (email:string , otp:string){
        try {
            const user = await otpModel.updateOne({email:email},{$set:{otp:otp}},{upsert:true})

            if(user){
                return{
                    success:true,
                    message:'OTP saved successfully'
                }
            }else{
                return{
                    success:false,
                    message:'user not found'
                }
            }
        } catch (error) {
            console.log(error);
            
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