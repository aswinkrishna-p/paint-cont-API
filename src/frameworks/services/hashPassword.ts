import bcrypt from 'bcrypt'
import { IhashPassword } from '../../useCase/interface/servicesintrface/hashPassword'

export class Encrypted implements IhashPassword{

    constructor(){}

     async hashpass(password: string): Promise<string> {
        const hashedpass = await bcrypt.hash(password,10)
        return hashedpass
    }

     async comparePass(password: string, hashpass: string): Promise<boolean> {
        const comparePass = await bcrypt.compare(password,hashpass)
        return comparePass
    }
}