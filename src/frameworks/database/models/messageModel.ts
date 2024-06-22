import mongoose, { Document, Schema, model } from "mongoose";
import { MessageInterface } from "../../../entity/messageEntity";

// Define the schema
const MessageSchema = new Schema<MessageInterface & Document>(
  {
    conversationId: {
      type: String,
    },
    sender:{
        type:String,
    },
    text:{
        type:String
    }
  },
  { timestamps: true }
);


const MessageModel = model<MessageInterface & Document>("Message", MessageSchema);

export default MessageModel;
