export interface Iuser {
    _id?:string,
    username:string,
    email:string,
    password:string,
    phone:number,
    address:{
        houseNo:number,
        location:string,
        pin:number
    }
    isBlocked?:boolean,
}