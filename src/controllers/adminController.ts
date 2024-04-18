import { Req, Res } from "../frameworks/types/serverPackageTypes";
import AdminUseCase from "../useCase/useCases/adminUseCase"


class AdminController {
    private AdminUseCase:AdminUseCase;

    constructor(AdminUseCase:AdminUseCase){
        this.AdminUseCase = AdminUseCase
    }


    async adminLogin(req:Req,res:Res){
        try {
            let {username, password} = req.body


            if(!username || !password){
                return res.status(401).json({
                    success:false,
                    message:'invalid username or password'
                })
            }


            const login = await this.AdminUseCase.adminlogin(username,password)

            const expirationDate = new Date(); // Create a new Date object
            expirationDate.setHours(expirationDate.getHours() + 1);

            if (login?.success) {
                res.cookie("admin_token", login?.token || "", {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    expires: expirationDate,
                });
                return res.status(200).json({
                    success: true,
                    token: login?.token,
                    admin: login?.admin 
                });
            } else {
                return res.status(200).json({
                    success: false,
                    message: login?.message,
                });
            }
        } catch (error) {
            console.log(error);
            
        }
    }
}