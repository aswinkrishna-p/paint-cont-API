import { Next, Req, Res } from "../frameworks/types/serverPackageTypes";
import Userusecase from "../useCase/useCases/userUseCase";
import { isValidEmail,isValidPassword,isValiduserName } from "../frameworks/middlewares/validations";



class userController {

    private userUseCase : Userusecase
    constructor(userUseCase:Userusecase){
        this.userUseCase = userUseCase
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

            const  user = await this.userUseCase.Register(req.body)
            res.status(user.status).json(user)
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

        const user = await this.userUseCase.login(req.body)

        const expirationDate = new Date()
        expirationDate.setHours(expirationDate.getHours() +1)

        if(user?.success){
          res.cookie('user_token',user.token || '',{
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