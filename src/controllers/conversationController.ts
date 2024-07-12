import { Req, Res } from "../frameworks/types/serverPackageTypes";
import messageUsecase from "../useCase/useCases/messageUseCase";




class conversationController {

    private conversationUseCase:messageUsecase

    constructor(conversationUseCase:messageUsecase){
        this.conversationUseCase = messageUsecase
    }

    async createConversation(req:Req,res:Res){
        try {
            
        } catch (error) {
            console.log(error);
            
        }
    }
}

export default conversationController