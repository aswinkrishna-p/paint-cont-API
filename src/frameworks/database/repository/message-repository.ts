import MessageModel from "../models/messageModel";



class messageRepository {


    async createMessage(conversationId:string,sender:string,text:string){
        try {
            
            const newMessage = new MessageModel({
                conversationId:conversationId,
                sender:sender,
                text:text
            })

            await newMessage.save()

            return newMessage
        } catch (error) {
            console.log(error);
            
        }
    }
}

export default messageRepository