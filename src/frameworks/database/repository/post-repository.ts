import mongoose from "mongoose";
import painterModel from "../models/painterModel";
import PostModel from "../models/postModel";
import userModel from "../models/userModel";

class postRepository {
  async allPosts() {
    try {
      const allposts = await PostModel.find().populate("painterId");
      // console.log(allposts,'all postss ');
      return allposts;
    } catch (error) {
      console.log(error);
    }
  }

  async painterPosts(painterid:string){
    try {
      const posts = await PostModel.find({painterId:painterid}).populate("painterId")
      // console.log('posts fetched',posts);
      return posts
    } catch (error) {
      console.log(error);
      
    }
  }

  async  updateLikes(postId:string,userId:string){
    try {
      
      let reported 

      const post = await PostModel.findById(postId)

      if(!post){
         return { 
           success: false,
           message: "Post not found" 
          };
       }

       const userindex = post.likes.indexOf(userId)

       if(userindex === -1){
        post.likes.push(userId)
        reported = true
       }else{
        post.likes.splice(userindex,1)
        reported = false
       }

       await post.save()

       return {
        success:true,
        message:'updated like in the post',
        post
       }

    } catch (error) {
      console.log(error);
      
    }
  }

  async addComment(postId:string ,userId :string ,content :string){
      try {
        console.log('inside addcomment');
        
        const post = await PostModel.findById(postId)

        if(!post){
          return { 
            success: false,
            message: "Post not found" 
           };
        }

        let user = null;
        let userName = '';
    
        // Check if the userId exists in UserModel
        user = await userModel.findById(userId);
        if (user) {
          userName = user.username;
        } else {
          // If not found in UserModel, check in PainterModel
          user = await painterModel.findById(userId);
          if (user) {
            userName = user.username;
          }
        }
    
        if (!user) {
          return { 
            success: false,
            message: "User or Painter not found" 
          }
        }
    
        // Create the new comment
        const newComment = {
          text: content,
          userId: new mongoose.Types.ObjectId(user._id),
          time: new Date(),
          userName: userName
        };
    
        // Push the new comment into the comments array
        post.comments.push(newComment);
    
        // Save the updated post
        await post.save();
    
        return{ 
          success: true, 
          message:'comment added successfully',
          comment: newComment 
        }

      } catch (error) {
        console.log(error);
        
      }
  }

  async reportPost(postId: string) {
    try {
      const post = await PostModel.findByIdAndUpdate(
        postId,
        { $inc: { reportCount: 1 } },
        { new: true }
      );

      if (!post) {
        return {
          success: false,
          message: "post not found",
        };
      }
      
      if(post.reportCount >= 10){
        
        post.isDelete = true
        await post.save()
        return {
          success:true,
          message:'Report count reached 10 , post marked for deletion',
          reportLimitReached: true,
        }
      }else if (post.reportCount === 1) {
        return {
          success: true,
          message: "Report count updated successfully",
          reportLimitReached: true,
        };
      } else {
        return {
          success: true,
          message: "Report count updated ...",
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deletePost(postId:string){
    try {
      
      const deleted = await PostModel.findByIdAndDelete(postId)

      if(deleted){
        console.log('post deleted successfully');
        
      }
    } catch (error) {
      console.log(error);
      
    }
  }
}

export default postRepository;
