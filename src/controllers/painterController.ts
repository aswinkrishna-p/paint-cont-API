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
        const save = await this.painterUseCase.Register(verify.verify?.result)
      }
      res.status(200).json(verify)
      } catch (error) {
        console.log(error);
        
      }
    }

    async resendOtpVerification(req:Req,res:Res){
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

        if(verify?.success){
          return res.status(200).json({success:true,message: verify?.message})
      }
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

    async resetPassword(req:Req,res:Res){
      try {
         const {email , newpass} = req.body

         if(!email || !newpass){
        
          return res.status(400).json({success:false, message:'required fields are missing'})
        }

        const result = await this.painterUseCase.updatepass(email,newpass)
       
        if(result?.success){
          res.status(200).json({success:true, message:result.message})
        }else{
          res.status(400).json({message:'try using another password'})
        }

      } catch (error) {
        console.log(error);
        
      }
    }

    async login(req:Req,res:Res){
      try {
        console.log('inside controller',req.body);

        let {email, password} = req.body

        email = email.trim();
        password = password.trim();

        if (!isValidEmail(email)) {
            return res
                .status(200)
                .json({ success: false, message: "Invalid email" });
        }

        if ((password == "")) {
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

    async profileupdate (req:Req ,res:Res){
      try {
        let {imageUrl ,userId} = req.body
       console.log(req.body,'body from frontend');
       
        imageUrl = imageUrl.trim()
        userId = userId.trim()

        if ( !imageUrl || !userId ) {
         return res.status(400).json({success: false, message: "Invalid imageUrl or userId"})
         }

         const saveprofilepic = await this.painterUseCase.saveuserprofile(imageUrl,userId)
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

   async createPost(req:Req,res:Res){
      try {

        console.log(req.body,'post bodyyyyyyyyy');
        
        const painterId = req.body.painterId.trim()
        const media = req.body.imageUrl.trim()
        const description = req.body.description.trim()

        if(!painterId || !media || !description){
          return res.status(400).json({success:false, message:"missing required fields"})
        }

        const createpost = await this.painterUseCase.CreatePost(painterId,media,description)
        if(createpost?.success){
          return res.status(200).json({success:true, data:createpost,message:createpost.message})
        }else{
          return res.status(400).json({success:false,message:createpost?.message})
        }
        // console.log(painterId,media,description,'the dataaaaaa');
        
      } catch (error) {
        console.log(error);
        res.status(500).json({
          success:false,
          message:'error in uploading post'
        })
        
      }
   }

   async createSlot(req:Req,res:Res){
    try {
      
      const painterId = req.params.painterId
      const {slots} = req.body
      console.log(slots,'slotss');
      console.log(painterId,'idddddddddd');
      
      if(!painterId || !slots){
        return res.status(400).json({success:false, message:"missing required fields"})
      }

      const saveslot = await this.painterUseCase.saveSlots(painterId,slots)

    return res.status(201).json({ message: 'Slot created successfully',});

      
    } catch (error) {
      console.log(error);
      
    }
   }

   async editSlots(req:Req,res:Res){
    try {
      
      const date = req.body.date
      const amount = req.body.amount
      const {slotId} = req.params

      if(!date || !amount){
        return res.status(400).json({success:false, message:"missing required fields"})
      }

      const response = await this.painterUseCase.updateSlots(date,amount ,slotId)

      if(response?.success){
        res.status(200).json({success:true,message:response?.message})

      }else{
        return res.status(400).json({success:false,message:response?.message})

      }
    } catch (error) {
      console.log(error);
      
    }
   }

   async deleteSlots(req:Req,res:Res){
      try {
        
        const {slotId} = req.params

        if(!slotId){
          return res.status(400).json({success:false, message:"missing required fields"})
        }

        const response = await this.painterUseCase.removeSlots(slotId)

        
      if(response?.success){
        res.status(200).json({success:true,message:response?.message})

      }else{
        return res.status(400).json({success:false,message:response?.message})

      }
  
      } catch (error) {
        console.log(error);
        
      }
   }

   async getPainter(req:Req,res:Res){
    try {

      console.log('insdie hereee');
      
      const {painterId} = req.params

      const painter = await this.painterUseCase.getpainter(painterId)
      if(painter?.success){
        res.status(200).json({success:true,painter:painter?.data})

      }else{
        return res.status(400).json({success:false,message:painter?.message})

      }
      
    } catch (error) {
      console.log(error);
      
    }
   }

   async getDashBoard(req:Req,res:Res){
    try {
      
      const {painterId} = req.params

       const result = await this.painterUseCase.fetchDash(painterId)

       if(result?.success){
        res.status(200).json({success:true, data:result.data, message:result.message})

      }else{
        return res.status(400).json({success:false, message:result?.message})

      }
    } catch (error) {
      console.log(error);
      
    }
   }

   async followPainter(req:Req,res:Res){
    try {
      const {painterId ,userId} = req.body
        console.log('helloooooo');
        
      if(!painterId || !userId){
        return res.status(404).json({success:false,message:'missing required fields'})
      }

      const updatePainter = await this.painterUseCase.updateFollowers(painterId,userId)
      if(updatePainter?.success){
        return res.status(200).json({success:true, data:updatePainter.data, message:updatePainter.message})
      }
    } catch (error) {
      console.log(error);
      
    }
   }

   async getFollowers(req:Req,res:Res){
    try {
      const id = req.params.painterId
      console.log(id);
      const Followers = await this.painterUseCase.getfollowers(id)

      if(Followers?.success){
        return res.status(200).json({success:true, data:Followers.data})
      }
      
    } catch (error) {
      console.log(error);
      
    }
   }

   async  updateDetails(req:Req,res:Res){
      try {
        console.log(req.body);
        const painterid = req.body.painterId
        const details = req.body.details

        console.log('painterid',painterid);
        console.log('detaislsss',details);

        if(!painterid || !details){
          return res.status(400).json({success:false, message:"missing required fields"})
        }

        const updated = await this.painterUseCase.updateDetails(painterid,details)
        
        if(updated?.success){
          return res.status(200).json({success:true, message:updated.message})
        }else{
          return res.status(400).json({success:false, message:updated?.message})
        }
        
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