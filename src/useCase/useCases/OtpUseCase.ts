import { Iotp } from "../../entity/otp";
import OtpRepository from "../../frameworks/database/repository/otp-repository";
import { verifyEmail } from "../../frameworks/services/emailService";
import generateOTP from "../../frameworks/services/otpService";
import { Encrypted } from "../../frameworks/services/hashPassword";


const bcrypt = new Encrypted();

class OtpUsecases {
    private otpRepository:OtpRepository
    constructor(otpRepository:OtpRepository){
        this.otpRepository = otpRepository
    }


    async SendOtp(user:Iotp){
        try {
            const newPassword = await bcrypt.hashpass(user.password);
            user.password = newPassword;
            const otp = await generateOTP(4)
            const otpsend = await verifyEmail(user.email,otp)
            user.otp = otp
            if(otpsend.success){
                const saveotp = await this.otpRepository.saveOtp(user)
            }
        } catch (error) {
            console.log(error);
            
        }

    }

    async verifyOTP(email:string,otp:string){
        try {
            const verify = await this.otpRepository.findUser(email)
            console.log(verify,'verify data in otpusecase');
            
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

    async resendOTP(email:string){
        try {
            const otp = await generateOTP(4)
            const otpsend = await verifyEmail(email,otp)
            if(otpsend.success){
                const saveotp = await this.otpRepository.resendOTP(email,otp)
                if(saveotp?.success){
                    return{
                        success:true,
                        message:'OTP sent successfully'
                    }
                }else{
                    return{
                        success:false,
                        message:saveotp?.message
                    }
                }
            }
        } catch (error) {
            console.log(error);
            
        }
    }
}


export default OtpUsecases