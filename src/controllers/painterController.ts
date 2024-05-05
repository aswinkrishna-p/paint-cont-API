import { Next, Req, Res } from "../frameworks/types/serverPackageTypes";
import PainterUseCase from "../useCase/useCases/painterUseCase";
import { isValidEmail,isValidPassword,isValiduserName } from "../frameworks/middlewares/validations";
import OtpUsecases from "../useCase/useCases/OtpUseCase";




class PainterController {
    
    private painterUseCase : PainterUseCase
    private otpusecase : OtpUsecases
    constructor(painterUseCase:PainterUseCase ,otpusecase:OtpUsecases){
        this.painterUseCase = painterUseCase
        this.otpusecase = otpusecase
    }

    async register(req: Req ,res:Res){
        try {
            console.log(req.body);

            let {username,email,password} = req.body

             username = username.trim()
             email = email.trim()
             password = password.trim()

            if(!username || !email || !password){
              return res.status(400).json({ success: false, message: "Missing required fields" });
            }
            
            if (!isValiduserName(username)) {             // Validate email format
              return res.status(400).json({ success: false, message: "Invalid Name" });
          }

          if (!isValidEmail(email)) {             // Validate email format
              return res.status(400).json({ success: false, message: "Invalid email format" });
          }

          if (!isValidPassword(password)) {        // Validate password
              return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
          }

            // const  user = await this.painterUseCase.Register(req.body)
            // res.status(user.status).json(user)`12
            const otpsend = await this.otpusecase.SendOtp(req.body)
            res.status(200).json({
              success: true,
              message: "OTP sent successfully",
          });
        } catch (error) {
            console.log(error);
            
        }
    }

    async otpVerification(req:Req,res:Res){
      try {
        console.log('inside the otp verification');
        
        let {email , otp} = req.body
        // email.trim()
        // otp.trim()

        if(!isValidEmail(email)){
          return res
          .status(200)
          .json({ success: false, message: "Invalid email format" });
        }

        const verify = await this.otpusecase.verifyOTP(email,otp)

        if(!verify?.success){
          return res.status(400).json({success:false,message: verify?.message})
      }else{
        const save = await this.painterUseCase.Register(verify.verify?.result)
      }
      } catch (error) {
        console.log(error);
        
      }
    }

    async login(req:Req,res:Res){
      try {
        // console.log('inside controller',req.body);

        let {email, password} = req.body

        email = email.trim();
        password = password.trim();

        if (!isValidEmail(email)) {
            return res
                .status(200)
                .json({ success: false, message: "Invalid email" });
        }

        if ((password = "")) {
            return res
                .status(200)
                .json({ success: false, message: "Invalid password" });
        }

        const user = await this.painterUseCase.login(req.body)

        const expirationDate = new Date()
        expirationDate.setHours(expirationDate.getHours() +1)

        if(user?.success){
          res.cookie('painter_token',user.token || '',{
            httpOnly: true,
            secure: true,
            sameSite: "none",
            expires: expirationDate,
            
          })
        }
        res.status(200).json(user) 
      } catch (error) {
        console.log(error);
        
      }

        
    }

    async logout(req:Req,res:Res){
      try {
        res.clearCookie('painter_token')
        res.status(200).json({
          success:true,
          message:'logout successful'
        })
      } catch (error) {
        console.log(error);
        res.status(500).json({
          success:false,
          message:'error in logout'
        })
        
      }
    }
}



export default PainterController