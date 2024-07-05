import mongoose, { Document, Schema, model } from "mongoose";
import { ConversationInterface } from "../../../entity/conversationsEntity";

const ConversationSchema = new Schema<ConversationInterface & Document>(
  {
    members: {
      type: [String],
      required: true
    },
    
  },
  { timestamps: true }
);


const ConversationModel = model<ConversationInterface & Document>("Conversation", ConversationSchema);

export default ConversationModel;