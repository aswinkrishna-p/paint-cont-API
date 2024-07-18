import ConversationModel from "../models/conversationsModel";
import MessageModel from "../models/messageModel";
import painterModel from "../models/painterModel";
import userModel from "../models/userModel";




class conversationRepository {
    
    async createConversation (senderId:string,receiverId:string){
        console.log('inside the create new conv');
        
        try {
            const conversation = await ConversationModel.find({
                members:{ $in:[senderId]}
            })

            const conversationNew = await ConversationModel.find({
                members: { $all: [senderId,receiverId]}
            });


            if(!conversationNew.length){
                if(!senderId || !receiverId){
                    return {
                        success :false,
                        message:'SenderId and ReceiverId are required'
                    }
                }

                const newConversation = new ConversationModel({
                    members : [senderId ,receiverId]
                })

                const savedConversation = await newConversation.save()
                conversation.push(savedConversation)
            }

            const data = await Promise.all(
                conversation.map(async (i:any) =>{
                    try {
                        const obj = {...i}._doc;
                        const painterData = await painterModel.findById(i.members[1]);
                        const userData = await userModel.findById(i.members[0]);
                        obj.painterName = painterData || null ;
                        obj.userName = userData || null ;
                        obj.messages = await MessageModel.findById(obj._id) || null
                        return obj
                    } catch (error) {
                        console.log(error);
                        return i
                        
                    }
                })
            );

            if(data){
                return{
                    success:true,
                    message:'conversation created successfully',
                    rsl:data
                }
            }else{
                return{
                    success:false,
                    message:'error occured in creating conversation',
                }
            }
 
            
        } catch (error) {
            console.log(error);
            
        }
    }

        async getConversationById(userId:string){
            try {
                const conversation = await ConversationModel.find({
                    members: {$in:[userId]}
                })

                const data = await Promise.all(
                    conversation.map(async (i:any) =>{
                        try {
                            const obj = {...i}._doc;
                            const painterData = await painterModel.findById(i.members[1]);
                            const userData = await userModel.findById(i.members[0]);
                            obj.painterName = painterData || null ;
                            obj.userName = userData || null ;
                            obj.messages = await MessageModel.findById(obj._id) || null
                            return obj
                        } catch (error) {
                            console.log(error);
                            return i
                            
                        }
                    })
                );

                data.sort((a,b)=>{
                    return (b.messages[b.messages.length-1]?.createdAt || null) - (a.messages[a.messages.length-1]?.createdAt || null)
                  })

                  if(data){
                    return{
                        success:true,
                        message:'conversation fetched successfully',
                        rsl:data
                    }
                }else{
                    return{
                        success:false,
                        message:'error occured in fetching conversation',
                    }
                }
            } catch (error) {
                console.log(error);
                
            }
        }
}

export default conversationRepository