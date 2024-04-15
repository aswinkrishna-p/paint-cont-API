export interface Iotp{
    _id:string,
    email:string,
    otp:string,
    createdAt?:Date,
    expiresAt?:Date,
}