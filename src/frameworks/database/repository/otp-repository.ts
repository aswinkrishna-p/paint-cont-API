import { Iotp } from "../../../entity/otp";
import { IOtpRepository } from "../../../useCase/interface/repositoryintrface/otpRepository";
import otpModel from "../models/otpModel"





export class OtpRepository implements IOtpRepository{
    
    // save otp
    async saveOtp(newUser: Iotp): Promise<Iotp> {
        try {
            const result = await otpModel.create(newUser)
            return result
        } catch (error:any) {
            throw(error)
        }
    }

    //  find user in otp model
     async findUser(email: string): Promise<Iotp | null> {
        try {
            let result = await  otpModel.findOne({email})
            return result
        } catch (error:any) {
            throw(error)
        }    
    }

    //  find and delete user

    async findAndDelete(email: string, verificationCode: string): Promise<boolean> {
        try {
            const result =  await otpModel.findOneAndDelete({email,otp:verificationCode})
            if(result){
                return true
            }else{
                return false
            }
        } catch (error) {
            throw(error)
        }
    }
}