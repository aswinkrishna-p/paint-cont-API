import mongoose, { Schema } from "mongoose";
import { Ipost } from "../../../entity/PostEntity";

const PostSchema: Schema = new mongoose.Schema({
  painterId: { type: mongoose.Types.ObjectId, required: true,ref:'Painter' },
  media: { type: String, required: true },
  description: { type: String, required: true },
  comments: { type: [String], default: [] },
  time: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  reportCount: { type: Number, default: 0 },
});

const PostModel = mongoose.model<Ipost>("Post", PostSchema);

export default PostModel;