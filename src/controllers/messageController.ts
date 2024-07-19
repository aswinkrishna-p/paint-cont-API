import { Req, Res } from "../frameworks/types/serverPackageTypes";
import messageUsecase from "../useCase/useCases/messageUseCase";


class messageController {

    private messageUseCase:messageUsecase

    constructor(messageUseCase:messageUsecase){
        this.messageUseCase = messageUseCase
    }

        async createMessages(req:Req,res:Res){
            try {
                console.log(req.body,'create message');

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

        async getMessageByConvId(req:Req,res:Res){

            console.log('inside the getmessage by conv id');
            
            try {
                
                const conversationId = req.params.conversationId

                if(!conversationId){
                    return res.status(404).json({success:false,message:'missing required fields'})
                }

                const result = await this.messageUseCase.getMessageByConversationId(conversationId)

                if(result){
                    return res.status(200).json({
                        success:true,
                        message:result.message,
                        data:result.data
                      })
                }else{
                    return res.status(400).json({
                        success:false,
                        message:'error in fetching messages'
                      })
                }

            } catch (error) {
                console.log(error);
                
            }
        }

        async getMessages(req:Req,res:Res){
            try {
                
                const {userId,painterId} = req.body

                console.log('insdie the get message in painter profile');
                

                if(!userId || !painterId){
                    return res.status(404).json({success:false,message:'missing required fields'})
                }

                const result = await this.messageUseCase.getMessages(userId,painterId)

                if(result){
                    return res.status(200).json({
                        success:true,
                        data:result.data
                      })
                }else{
                    return res.status(400).json({
                        success:false,
                        message:'error in fetching messages'
                      })
                }
            } catch (error) {
                console.log(error);
                
            }
        }

}


export default messageController