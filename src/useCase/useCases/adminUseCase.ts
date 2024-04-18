import { Encrypted } from "../../frameworks/services/hashPassword"
import jWTService from "../../frameworks/services/jwtService"
import IadminRepository from "../interface/repositoryintrface/adminRepository"


const bycrypt = new Encrypted
const JWT = new jWTService

class AdminUseCase {
    private adminrepository :IadminRepository

    constructor(adminrepository:IadminRepository){
        this.adminrepository = adminrepository
    }

    async adminlogin(username:string,password:string){
        try {
            const admin = await this.adminrepository.adminLogin(username)

            if(admin){
                const passcheck = await bycrypt.comparePass(password , admin.password)

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
}
export default AdminUseCase