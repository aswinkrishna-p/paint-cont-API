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

}



export default PostUseCase