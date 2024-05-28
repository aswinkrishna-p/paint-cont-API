import { Next, Req, Res } from "../frameworks/types/serverPackageTypes";
import { isValidEmail,isValidPassword,isValiduserName } from "../frameworks/middlewares/validations";
import PostUseCase from "../useCase/useCases/postUseCase";





class postController {
        private postUseCase : PostUseCase


        constructor(postUseCase:PostUseCase){
            this.postUseCase = postUseCase
        }  
        
        
        
        async getAllPosts(req:Req,res:Res){
            try {
              
              const allposts = await this.postUseCase.fetchAllPosts()
              return res.status(200).json(allposts)
            } catch (error) {
              console.log(error);
              res.status(500).json({
                success:false,
                message:'error in fetching all posts'
              })
            }
        }

        async reportPost(req:Req,res:Res){
          try {
            const {postId} = req.body

            console.log(postId);

            if(!postId){
              return res.status(400).json({
                success:false,
                message:'invalid postId'
              })
            }

            const postReported = await this.postUseCase.reportPosts(postId)

            if(!postReported){
              return res.status(400).json({
                success:false,
                message:'Error in updating the report count'
              })
            }

            return res.status(200).json({success:true,message:'report count updated',data:postReported})
            
          } catch (error) {
            console.log(error);
            
          }
        }


}



export default postController