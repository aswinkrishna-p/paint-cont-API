import OtpRepository from "../../frameworks/database/repository/otp-repository";
import generateOTP from "../../frameworks/services/otpService";
import { sendEmail } from "../../frameworks/services/emailService";



class OtpUsecases {
    private otpRepository:OtpRepository
    constructor(otpRepository:OtpRepository){
        this.otpRepository = otpRepository
    }


    async SendOtp(email:string){
        try {
            const otp = await generateOTP(4)
            const otpsend = await sendEmail(email ,otp)
        } catch (error) {
            console.log(error);
            
        }

    }
}