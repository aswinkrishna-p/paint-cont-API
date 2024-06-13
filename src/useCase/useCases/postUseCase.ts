import postRepository from "../../frameworks/database/repository/post-repository"







class PostUseCase {
    private postRepository:postRepository


    constructor(postRepository:postRepository){
        this.postRepository = postRepository
    }


    async fetchAllPosts(){
        try {
          const allposts = await this.postRepository.allPosts()
          if(allposts) {
            return {
              success:true,
              posts:allposts,
              message:'All the posts fetched successfully'
            }
          }else{
            return{
              success:false,
              message:'Error in fetching allposts'
            }
          }
        } catch (error) {
          console.log(error);
          
        }
      }

      async painterPosts(painterid:string){
        try {
          const posts = await this.postRepository.painterPosts(painterid)
          if(posts) {
            return {
              success:true,
              posts:posts,
              message:'All the posts fetched successfully'
            }
          }else{
            return{
              success:false,
              message:'Error in fetching allposts'
            }
          }
        } catch (error) {
          console.log(error);
          
        }
      }

      async reportPosts(postId:string){
        try {
          const reported = await this.postRepository.reportPost(postId)

          if(reported){
            return{
              success:true,
              data:reported
            }
          }else{
            return{
              success:false,
              message:'Error in reporting post'
            }
          }
        } catch (error) {
          console.log(error);
          
        }
      }

      async updateLikes(postId:string ,userId:string){
        try {
          
          const likes = await this.postRepository.updateLikes(postId,userId)

          if(likes?.success){
            return {
              success:true,
              message:likes.message,
              data:likes.post
            }
          }else{
            return {
              success:false,
              message:'error in updating likes'
            }
          }
        } catch (error) {
          console.log(error);
          
        }
      }


      async deletePost(postId:string){
        try {
          
          const Dltpost = await this.postRepository.deletePost(postId)
        } catch (error) {
          console.log(error);
          
        }
      }

}



export default PostUseCase