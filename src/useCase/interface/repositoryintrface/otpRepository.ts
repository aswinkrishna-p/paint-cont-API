import { Iotp } from "../../../entity/otp";


export interface IOtpRepository {
    saveOtp(newUser:Iotp):Promise<Iotp> 
    findUser(email:string):Promise<Iotp | null>
    findAndDelete(email:string,verificationCode:string):Promise<boolean>
}