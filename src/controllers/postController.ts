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

        async getPainterPosts(req:Req,res:Res){
          try {
            const painterId = req.params.id
            // console.log(painterId,'painter id');

            const allposts = await this.postUseCase.painterPosts(painterId)
            return res.status(200).json(allposts)
            
          } catch (error) {
            console.log(error);
            
          }
        }

        async updateLike(req:Req,res:Res){
          try {
            const {postId ,userId} = req.body
            console.log(postId,'post id');
            console.log(userId,'user id');

            if(!postId || !userId){
        
              return res.status(400).json({success:false, message:'required fields are missing'})
            }
        
            const updatelike = await this.postUseCase.updateLikes(postId,userId)
            return res.status(200).json({success:true, message:updatelike?.message , data:updatelike?.data})
            
          } catch (error) {
            console.log(error);
            
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

        async deltePost(req:Req,res:Res){
          try {

            const {postId} = req.params
            console.log(postId,'id posttt');

            if(!postId){
              return res.status(400).json({
                success:false,
                message:'invalid postId'
              })
            }

            const deletepost = await this.postUseCase.deletePost(postId)
            
          } catch (error) {
            console.log(error);
            
          }
        }


}



export default postController