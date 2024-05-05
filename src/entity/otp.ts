export interface Iotp{
    username:string,
    email:string,
    password:string,
    otp:string,
    createdAt?:Date,
    expiresAt?:Date,
}