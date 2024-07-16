import { Req, Res } from "../frameworks/types/serverPackageTypes";
import messageUsecase from "../useCase/useCases/messageUseCase";


class messageController {

    private messageUseCase:messageUsecase

    constructor(messageUseCase:messageUsecase){
        this.messageUseCase = messageUseCase
    }

        async createMessages(req:Req,res:Res){
            try {
                console.log(req.body);

            const {conversationId, sender, text} = req.body

                const result = await this.messageUseCase.createMessage(conversationId,sender,text)

                if(result){
                    return res.status(200).json({
                        success:true,
                        message:result.message,
                      })
                }else{
                    return res.status(400).json({
                        success:false,
                        message:'error in saving message'
                      })
                }
                
            } catch (error) {
                console.log(error);
                
            }
        }

}


export default messageController