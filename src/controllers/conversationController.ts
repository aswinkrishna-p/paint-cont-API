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
        } catch (error) {
            console.log(error);
            
        }
    }
}

export default conversationController