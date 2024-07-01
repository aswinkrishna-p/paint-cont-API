import mongoose, { ObjectId } from "mongoose";

export interface paymentInterface{
    userId:string  | ObjectId ;
    painterId:string | ObjectId;
    amount:number;
    date:Date;
    paymentId:string
}