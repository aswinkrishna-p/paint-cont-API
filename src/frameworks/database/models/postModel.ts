import mongoose, { Schema } from "mongoose";
import { Ipost } from "../../../entity/PostEntity";


const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  userId: { type: String, required: true},
  time: { type: Date, default: Date.now },
  userName: { type: String},
});

const PostSchema: Schema = new mongoose.Schema({
  painterId: { type: mongoose.Types.ObjectId, required: true,ref:'Painter' },
  media: { type: String, required: true },
  description: { type: String, required: true },
  comments: [commentSchema] ,
  time: { type: Date, default: Date.now },
  likes: [],
  reportCount: [],
  isDelete:{type:Boolean,default:false},
});

const PostModel = mongoose.model<Ipost>("Post", PostSchema);

export default PostModel;