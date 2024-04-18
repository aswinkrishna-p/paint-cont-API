import { IAdmin } from "../../../entity/AdminEntity";
import { CustomInterface } from "../Custom/CustomInterface";


 interface IadminRepository {
    adminLogin(username:string):Promise<IAdmin | null>
}

export default IadminRepository