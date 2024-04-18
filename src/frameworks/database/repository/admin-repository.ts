import { IAdmin } from "../../../entity/AdminEntity";
import IadminRepository from "../../../useCase/interface/repositoryintrface/adminRepository";
import AdminModel from "../models/adminModel";



class AdminRepository implements IadminRepository{

    
     async adminLogin(username: string):Promise<IAdmin | null>{
        try {
            const admin = await AdminModel.findOne({username:username})
            return admin
        } catch (error) {
            console.log(error);
            return null  
        }
    }
}

export default AdminRepository