import { ObjectId } from "mongoose";
export interface SlotInterface {
    _id:string;
    date?: Date;
    start?: string;
    end?: string; 
    painterId?: string; 
    userId?:ObjectId;
    status?:string;
    amount?:number  
}
