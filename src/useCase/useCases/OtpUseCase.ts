import OtpRepository from "../../frameworks/database/repository/otp-repository";
import { verifyEmail } from "../../frameworks/services/emailService";
import generateOTP from "../../frameworks/services/otpService";




class OtpUsecases {
    private otpRepository:OtpRepository
    constructor(otpRepository:OtpRepository){
        this.otpRepository = otpRepository
    }


    async SendOtp(email:string){
        try {
            const otp = await generateOTP(4)
            const otpsend = await verifyEmail(email,otp)
            const userdata = {email,otp}
            if(otpsend.success){
                const saveotp = await this.otpRepository.saveOtp(userdata)
            }
        } catch (error) {
            console.log(error);
            
        }

    }

    async verifyOTP(email:string,otp:string){
        try {
            const verify = await this.otpRepository.findUser(email)

            if(verify.success){
                if(verify.result?.otp === otp){
                    return{
                        success:true,
                        verify
                    }
                }else{
                    return{
                        success:false,
                        message:'otp mismatch'
                    }
                }
            }else{
                return{
                    success:false,
                    message:verify.message
                }
            }
        } catch (error) {
            console.log(error);
            
        }
    }
}


export default OtpUsecases