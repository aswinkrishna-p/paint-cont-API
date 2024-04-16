import { Next, Req, Res } from "../frameworks/types/serverPackageTypes";
import Userusecase from "../useCase/useCases/userUseCase";



class userController {

    private userUseCase : Userusecase
    constructor(userUseCase:Userusecase){
        this.userUseCase = userUseCase
    }

    async register(req: Req ,res:Res){
        try {
            // console.log(req.body);
            
            const  user = await this.userUseCase.Register(req.body)
            res.status(user.status).json(user)
        } catch (error) {
            console.log(error);
            
        }
    }

    async login(req:Req,res:Res){
      try {
        // console.log('inside controller',req.body);

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
}



export default userController