import { Iuser } from "../../entity/userEntity";
import IUserRepository from "../interface/repositoryintrface/userRepository";
import { Encrypted } from "../../frameworks/services/hashPassword";
import jWTService from "../../frameworks/services/jwtService";


const bcrypt = new Encrypted()
const JWT = new jWTService()

class Userusecase {

    private userRepository: IUserRepository;

    constructor(
        userRepository:IUserRepository,
       
    ) {
        this.userRepository = userRepository
        
    }

    async Register(user:Iuser){

        const checkemail = await this.userRepository.findByEmail(user.email)

        if(checkemail){
            return {
                status: 400,
                message: 'User already exists',
            }
        }
        else{
            const newPassword = await bcrypt.hashpass(user.password)
            user.password = newPassword

            const Rdata = await this.userRepository.saveuser(user)
            return {
                status:200,
                message: Rdata.message,
                data: Rdata.data,
            }
        }

    }


    async login(user:Iuser){

        console.log('inside login');
        try {
            const userdata = await this.userRepository.findByEmail(user.email)

        if(!userdata){
            return {
                success:false,
                message:'user not found'
            }
        }else{

            if(!userdata.status){
                return{
                    success:false,
                    message:'user blocked by admin'
                }
            }
        

        const validpass = await bcrypt.comparePass(user.password ,userdata.data.password)

        userdata.data.password = ''


        if(validpass){
            const token = await JWT.createToken(userdata.data._id as string ,"user")
            // console.log(token,'token indakiii');
            
            if(token){
                return{
                    status:200,
                    success:true,
                    message:'valid user',
                    data:userdata?.data
                }
            }else{
                return{
                    success:false,
                    message:'error in token generation'
                }
            }
        }else{
            return{
                success:false,
                message:'Invalid Credentials'
            }
        }
        }

        } catch (error) {
            console.log(error);
            
        }
 
        
    }
}




export default Userusecase