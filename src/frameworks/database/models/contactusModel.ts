import mongoose, { Document, Schema, Model } from "mongoose";
import { contactInterface } from "../../../entity/contactEntity";

const contactSchema = new Schema<contactInterface & Document>({
    name: { type: String, required: true },
    mail: { type: String, required: true },
    message: { type: String, required: true },
});

const contactModel: Model< contactInterface & Document> = mongoose.model("contactUs", contactSchema);

export default contactModel;