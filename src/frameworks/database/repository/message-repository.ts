import ConversationModel from "../models/conversationsModel";
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

    async getMessageByConvId (conversationId:string){
        try {
            
            const messages = await MessageModel.find({
                conversationId:conversationId
            })

            if(messages){
                return{
                    success:true,
                    message:'messages fetched successfully',
                    rsl:messages
                }
            }else{
                return{
                    success:false,
                    message:'error occured in fetching message',
                }
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    async getMessages(userId:string,painterId:string){
        try {
            
            const convMembers: {_id:any} | null = await ConversationModel.findOne({ members: { $all: [userId, painterId] } })

            if (!convMembers) {
                return {
                     success: false,
                      message: 'Conversation not found'
                 };
              }

              const convId: string = convMembers._id.toString();

              const messageHistory = await MessageModel.find({ conversationId: convId });

              if(messageHistory){
                return{
                    success:true,
                    messageHistory
                }
              }else{
                return{
                    success:false,
                    message:'error in fetching messages'
                }
              }
        } catch (error) {
            console.log(error);
            
        }
    }
}

export default messageRepository