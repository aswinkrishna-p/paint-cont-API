export interface IhashPassword {

    hashpass(password:string):Promise<string>

    comparePass(password:string,hashpass:string):Promise<boolean>
}