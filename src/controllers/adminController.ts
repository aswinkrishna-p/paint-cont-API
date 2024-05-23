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
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    }

    async adminLogout (req:Req, res:Res){
        try {
            res.clearCookie('admin_token')
            res.status(200).json({
                success:true,
                message:'logout successful'
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Error in logout",
            });
        }
    }

    async getUsers (req:Req,res:Res){
        try {
            const users = await this.AdminUseCase.Users()
            res.status(200).json({users})
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success:false,
                message:(error as Error)?.message
            })
            
        }
    }

    async getPainters (req:Req,res:Res){
        try {
            const users = await this.AdminUseCase.Painters()
            res.status(200).json({users})
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success:false,
                message:(error as Error)?.message
            })
            
        }
    }

    async blockUser(req:Req ,res:Res){
        try {
            const userId = req.params.id
            if(!userId){
                return res.status(400).json({success:false,message:'invalid user id '})
            }

            const blockuser = await this.AdminUseCase.changeUserStatus(userId)
            if(blockuser?.success){
                return res.status(200).json({
                    success:true,
                    user:blockuser.user,
                    message:blockuser.message
                })
            }else{
                return res.status(400).json({
                    success:false,
                    message:blockuser?.message
                })
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: (error as Error).message });
            
        }
    }
}

export default AdminController