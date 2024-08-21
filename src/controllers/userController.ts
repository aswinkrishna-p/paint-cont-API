import { Next, Req, Res } from "../frameworks/types/serverPackageTypes";
import Userusecase from "../useCase/useCases/userUseCase";
import { isValidEmail,isValidPassword,isValiduserName } from "../frameworks/middlewares/validations";
import OtpUsecases from "../useCase/useCases/OtpUseCase";




class userController {

    private userUseCase : Userusecase
    private otpusecase: OtpUsecases
    constructor(userUseCase:Userusecase,otpusecase:OtpUsecases){
        this.userUseCase = userUseCase
        this.otpusecase = otpusecase
    }

    async register(req: Req ,res:Res){
        try {
            // console.log(req.body);

            const username = req.body.username.trim()
            const email = req.body.email.trim()
            const password = req.body.password.trim()

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

            // const  user = await this.userUseCase.Register(req.body)
            // res.status(user.status).json(user)
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
        
        console.log(typeof req.body.email,'type off ');
        
          const email = req.body.email
          const otp = req.body.otp
        email.trim()
        otp.trim()
        console.log(email ,'email inside verifcation');

        if(!isValidEmail(email)){
          return res
          .status(200)
          .json({ success: false, message: "Invalid email format" });
        }

        const verify = await this.otpusecase.verifyOTP(email,otp)

        if(!verify?.success){
          return res.status(400).json({success:false,message: verify?.message})
      }else{
        const save = await this.userUseCase.Register(verify.verify?.result)
      }
      res.status(200).json(verify)
      } catch (error) {
        console.log(error);
        
      }
    }


    async resendOTP(req:Req,res:Res){
      try {
        console.log('inside the resend otp backend');
        
        let {email} = req.body;
        if(!isValidEmail){
          return res
            .status(400)
            .json({success:false,message:"Invalid email"})
        }else{
          const resendOTP = await this.otpusecase.resendOTP(email)
          if(resendOTP?.success){
            res.status(200).json({
              success: true,
              message: resendOTP.message
          })
          }else{
            res.status(400).json({
              success: false,
              message: resendOTP?.message
          })
          }
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: (error as Error)?.message,
        })
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

        const user = await this.userUseCase.login(req.body)

        const expirationDate = new Date()
        expirationDate.setHours(expirationDate.getHours() +1)

        if(user?.success){
          res.cookie('user_token',user.token || '',{
            httpOnly: true,
            secure: true,
            sameSite: "none",
            expires: expirationDate,
            
          });
          return res.status(200).json({
            success:true,
            message:'login successful',
            user:user.data,
            token:user.token
          });
        }else{
          return res.status(400).json({
            success:false,
            message:user?.message
          })
        }
      } catch (error) {
        console.log(error);
        
      }

        
    }


    async add_address(req:Req ,res:Res){
      try {
        let {address,phoneNo,userId} = req.body

        // console.log(req.body,'req body');
        
        // address = req.body.address.trim()
        // phoneNo = req.body.phoneNo.trim()

        if(!phoneNo || !userId){
        
          return res.status(400).json({success:false, message:'required fields are missing'})
        }
       
        const addAddress = await this.userUseCase.addUserAddress(address, phoneNo,userId)
      
        res.status(200).json(addAddress) 
      } catch (error) {
        console.log(error);
        
      }
    }

    async profileupdate (req:Req ,res:Res){
       try {
         let {imageUrl ,userId} = req.body
        console.log(req.body,'body from frontend');
        
         imageUrl = imageUrl.trim()
         userId = userId.trim()

         if ( !imageUrl || !userId ) {
          return res.status(400).json({success: false, message: "Invalid imageUrl or userId"})
          }

          const saveprofilepic = await this.userUseCase.saveuserprofile(imageUrl,userId)
          if(saveprofilepic?.success){
            return res.status(200).json(saveprofilepic)
          }else{
            return res.status(400).json(saveprofilepic)
          }
       } catch (error) {
        console.log(error);
        res.status(500).json({
          success:false,
          message:'error in updateing profilepic'
        })
        
       }
    }

    async searchPainter(req:Req ,res:Res){
      try {
        console.log(req.body,'body in search');

        const {name} = req.body

        if(!name){
          return res.status(400).json({success: false, message: "username is required"})
        }

        const painters = await this.userUseCase.searchForPainter(name)

        if(painters){
          return res.status(200).json({success:true,message:painters.message,data:painters.data})
        }else{
          return res.status(400).json({success:false,message:'painter not found'})
        }
        
      } catch (error) {
        console.log(error);
        
      }
    }

    async contactPage(req:Req,res:Res){
        try {
          const { name, mail, message } = req.body;
          console.log('inside contact',req.body);
          

          if (!name) {
            return res.status(400).json({ success: false, message: "Name is required" });
          }
        
          if (!mail) {
            return res.status(400).json({ success: false, message: "Email is required" });
          }
        
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(mail)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
          }
        
          if (!message) {
            return res.status(400).json({ success: false, message: "Message is required" });
          }

          const response = await this.userUseCase.contactMessages(name,mail,message)

          if(response?.success){
            return res.status(200).json({
              success:true,
              message:response.message
            })
          }else{
            return res.status(400).json({
              success:false,
              message:response?.message
            })
          }
        } catch (error) {
          console.log(error);
          
        }
    }


    async makePayment(req:Req,res:Res){ 
      try {

        console.log('hellooooooooooooo');
        
        
        const {userId,slotid} = req.body

        console.log('inside make payment', userId,slotid);
        

        if (!slotid ) {
          return res.status(400).json({ message: "Slot information is missing" });
        }

        const payment = await this.userUseCase.slotPayment(req, userId,slotid)

        if(payment?.success){
          return res.status(200).json({success:true,data:payment.data})
        }

      } catch (error) {
        console.log(error);
        
      }
    }

    async paymentWebHook(req:Req,res:Res){
      try {
        
          const result = await this.userUseCase.paymentWebhook(req)
      } catch (error) {
        console.log(error);
        
      }
    }

    async logout(req:Req,res:Res){
      try {
        res.clearCookie('user_token')
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



export default userController