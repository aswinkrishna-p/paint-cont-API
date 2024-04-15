import { Iuser } from "../../../entity/userEntity";
import { CustomInterface } from "../Custom/CustomInterface";


interface IUserRepository{
    saveuser(user:Iuser):  Promise<CustomInterface<Iuser>>
    findByEmail(email:string):Promise<CustomInterface<Iuser> | null>
}

export default IUserRepository