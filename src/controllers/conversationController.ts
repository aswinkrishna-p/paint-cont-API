import { Req, Res } from "../frameworks/types/serverPackageTypes";
import messageUsecase from "../useCase/useCases/messageUseCase";




class conversationController {

    private conversationUseCase:messageUsecase

    constructor(conversationUseCase:messageUsecase){
        this.conversationUseCase = conversationUseCase
    }

    async createConversation(req:Req,res:Res){
        try {
            console.log('inside the create convee');

            const {senderId,receiverId} = req.body
            

            const result = await this.conversationUseCase.createConversation(senderId,receiverId)
            
            if(result){
                return res.status(200).json({
                    success:true,
                    message:result.message,
                    data:result.data
                  })
            }else{
                return res.status(400).json({
                    success:false,
                    message:'error in creating conversation'
                  })
            }
        } catch (error) {
            console.log(error);
            
        }
    }


    async getConversationByUserId(req:Req, res:Res){
        try {
            
            const userId = req.params.userId

            if(!userId){
                return res.status(404).json({success:false,message:'missing required fields'})
            }

            const result = await this.conversationUseCase.getConversationById(userId)

            if(result){
                return res.status(200).json({
                    success:true,
                    message:result.message,
                    data:result.data
                  })
            }else{
                return res.status(400).json({
                    success:false,
                    message:'error in fetching conversation'
                  })
            }
        } catch (error) {
            console.log(error);
            
        }
    }
}

export default conversationController