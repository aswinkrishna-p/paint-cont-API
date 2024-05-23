import AdminModel from "../models/adminModel";
import painterModel from "../models/painterModel";
import userModel from "../models/userModel";



class AdminRepository {

    
     async adminLogin(username: string){
        try {
            const admin = await AdminModel.findOne({username:username})
            return admin
        } catch (error) {
            console.log(error);
            
        }
    }
    
    async getAllUsers() {
        try {
            let res = await userModel.find()
            // console.log(res,'users found in repoo');
            return res
        } catch (error) {
            console.log(error);
            return null
            
        }
    }
    async getAllPainters() {
        try {
            let res = await painterModel.find()
            // console.log(res,'users found in repoo');
            return res
        } catch (error) {
            console.log(error);
            return null
            
        }
    }

    async  changestatus(userId:string){
        try {
            const user = await userModel.findById(userId)

            if(user){
                user.isBlocked = ! user.isBlocked
                const success = await user.save()

                if(success){
                    return{
                        success:true,
                        message: ` ${user.isBlocked ? 'blocked' : 'Unblocked'} user`,
                        user: user
                    }
                }else{
                    return{
                        success:false,
                        message: ` ${user.isBlocked? 'Unblocked' : 'Blocked'} user`,
        
                    }
                }
            }else{
                return{
                    success:false,
                    message:'user not found'
                }
            }
        } catch (error) {
            console.log(error);
            
        }
    }
}

export default AdminRepository