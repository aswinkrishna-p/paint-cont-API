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
    } catch (error) {
        console.log(error);
        
    }
}

async getConversationById(userId:string){
    try {
        
        const Response = await this.ConversationRepository.getConversationById(userId)
    } catch (error) {
        console.log(error);
        
    }
}

}

export default messageUsecase