import mongoose, { Schema, Document, model, Model } from "mongoose";
import { paymentInterface } from "../../../entity/PaymentEntity";

const paymentSchema = new Schema<paymentInterface>({
    userId: { type: mongoose.Types.ObjectId, required: true,ref:'User' },
    painterId: { type: mongoose.Types.ObjectId,ref:'painter' },
    date: { type: Date,default:new Date() },
    amount: { type: Number, required: true },
    paymentId:{type:String}
});

const paymentModel = model<paymentInterface>("payment", paymentSchema);
export default paymentModel;