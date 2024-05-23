import AdminRepository from "../../frameworks/database/repository/admin-repository"
import { Encrypted } from "../../frameworks/services/hashPassword"
import jWTService from "../../frameworks/services/jwtService"



const bycrypt = new Encrypted
const JWT = new jWTService

class AdminUseCase {
    private adminrepository :AdminRepository

    constructor(adminrepository:AdminRepository){
        this.adminrepository = adminrepository
    }

    async adminlogin(username:string,password:string){
        try {
            const admin = await this.adminrepository.adminLogin(username)

            if(admin){
                const passcheck = await bycrypt.comparePass(password , admin.password)

                admin.password = ''

                if(passcheck){
                    const token = await JWT.createToken(admin.username,'admin')
                    return {
                        success:true,
                        token,
                        admin
                    }
                }else {
                    return {
                        success :false,
                        message:'wrong password'
                    }
                }
            }else{
                return {
                    success:false,
                    message:'admin not found'
                }
            }
        } catch (error) {
            console.log(error);
            
        }

    }

    async Users(){
        try {
            const users = await this.adminrepository.getAllUsers()
            if(users){
                return{
                    success:true,
                    data:users
                }
            }else{
                return{
                    success:false,
                    message:'users data not found'
                }
            }
        } catch (error) {
          console.log(error);
            
        }
    }

    async Painters(){
        try {
            const users = await this.adminrepository.getAllPainters()
            if(users){
                return{
                    success:true,
                    data:users
                }
            }else{
                return{
                    success:false,
                    message:'users data not found'
                }
            }
        } catch (error) {
          console.log(error);
            
        }
    }

    async changeUserStatus(userId:string){
        try {
            const blockuser = await this.adminrepository.changestatus(userId)
            return blockuser
        } catch (error) {
            console.log(error);
            
        }
    }
}
export default AdminUseCase