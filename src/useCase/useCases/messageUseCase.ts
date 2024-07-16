import conversationRepository from "../../frameworks/database/repository/conversation-repository"
import messageRepository from "../../frameworks/database/repository/message-repository"



class messageUsecase {

private ConversationRepository:conversationRepository
private MessageRepository:messageRepository


constructor(ConversationRepository:conversationRepository,MessageRepository:messageRepository){
    this.ConversationRepository = ConversationRepository
    this.MessageRepository = MessageRepository
}


async createConversation(senderId:string,receiverId:string){
    try {
        
        const result = await this.ConversationRepository.createConversation(senderId,receiverId)

        if(result){
            return{
                success:true,
                message:result.message,
                data:result.rsl
            }
        }else{
            return{
                success:false,
                message:'error in creating conversation'
            }
        }
    } catch (error) {
        console.log(error);
        
    }
}

async getConversationById(userId:string){
    try {
        
        const Response = await this.ConversationRepository.getConversationById(userId)

        if(Response){
            return{
                success:true,
                message:Response.message,
                data:Response.rsl
            }
        }else{
            return{
                success:false,
                message:'error in fetching conversation'
            }
        }
    } catch (error) {
        console.log(error);
        
    }
}

async createMessage(conversationId:string,sender:string,text:string){
    try {
        

        const Response = await this.MessageRepository.createMessage(conversationId,sender,text)

        if(Response){
            return{
                success:true,
                message:'message saved successfully'
            }
        }else{
            return{
                success:false,
                message:'error in saving message'
            }
        }
    } catch (error) {
        console.log(error);
        
    }
}

}

export default messageUsecase