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

    async dashBoard(req:Req,res:Res){
        try {
            
            const response = await this.AdminUseCase.getDashboard()

            if(response){
                res.status(200).json({
                    success:true,
                    message:response.message,
                    users:response.users,
                    painters:response.painters,
                    blockedPainters:response.blockedPainters,
                    blockedUsers:response.blockedUsers
                })
            }else{
                res.status(400).json({
                    success:false,
                    message:'error in fetching data'
                })
            }
        } catch (error) {
            console.log(error);
            
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
    async blockPainter(req:Req ,res:Res){
        try {
            const userId = req.params.id
            if(!userId){
                return res.status(400).json({success:false,message:'invalid painter id '})
            }

            const blockuser = await this.AdminUseCase.changePainterStatus(userId)
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

    async getDeletePosts(req:Req,res:Res){
        try {
            
            const response = await this.AdminUseCase.fetchdeletePosts()

            if(response){
                return res.status(200).json({
                    success:true,
                    data:response.data,
                    message:response.message
                })
            }else{
                return res.status(400).json({
                    success:false,
                    message:" no deleted posts"
                })
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    async DeletePosts(req:Req,res:Res){
        try {
            
            const postId = req.params.id

            if(!postId){
                return res.status(400).json({success:false,message:' post id not found'})
            }

            const response = await this.AdminUseCase.deletePosts(postId)

            if(response){
                return res.status(200).json({
                    success:true,
                    message:response.message
                })
            }else{
                return res.status(400).json({
                    success:false,
                    message:" error in deleting posts"
                })
            }

        } catch (error) {
            console.log(error);
            
        }
    }

    async getGraphs(req:Req,res:Res){
        try {
            
            const response = await this.AdminUseCase.fetchGraphs()

            if(response){
                res.status(200).json({
                    success:true,
                    message:response.message,
                    posts:response.posts
                })
            }else{
                res.status(400).json({
                    success:false,
                    message:'error in fetching posts'
                })
            }
        } catch (error) {
            console.log(error);
            
        }
    }
}

export default AdminController