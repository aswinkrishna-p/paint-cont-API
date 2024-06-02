import PostModel from "../models/postModel";

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
      } else if (post.reportCount === 1) {
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
