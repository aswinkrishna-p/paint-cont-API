import mongoose, { Document, Schema, Model } from "mongoose";
import { BookingInterface } from "../../../entity/BookingEntity";

const bookingSchema = new Schema<BookingInterface & Document>({
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
});

const bookingModel: Model< BookingInterface & Document> = mongoose.model("booking", bookingSchema);

export default bookingModel;