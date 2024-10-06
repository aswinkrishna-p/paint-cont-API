import mongoose, { Document, Schema, Model } from "mongoose";
import { SlotInterface } from "../../../entity/slotsEntity";

const slotSchema = new Schema<SlotInterface & Document>({
    date: {
        type: Date,
        required: true
    },
    painterId: {
        type: String,
        ref: 'Painter',
        required: true
    },
    userId: {
        type: String,
        ref: 'User'
    },
    status:{
        type:String,
        default:"pending"
    },
    amount:{
        type: Number,
        required:true
    },
});

const SlotModel: Model<SlotInterface & Document> = mongoose.model("Slot", slotSchema);

export default SlotModel;