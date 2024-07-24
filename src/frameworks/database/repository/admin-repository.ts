import AdminModel from "../models/adminModel";
import painterModel from "../models/painterModel";
import PostModel from "../models/postModel";
import userModel from "../models/userModel";



class AdminRepository {

    
     async adminLogin(username: string){
        try {
            const admin = await AdminModel.findOne({username:username})
            return admin
        } catch (error) {
            console.log(error);
            
        }
    }

    async  getDashBoard(){
        try {
            
            const users = await userModel.find()
            const painters = await painterModel.find()

            const blockedPainter = await painterModel.find({isBlocked:true})
            const blockedUsers = await userModel.find({isBlocked:true})

            if(!users){
                return{
                    success:false,
                     message:'no users found' 
                }  
            }

            if(!painters){
                return{
                    success:false,
                    message:'no painters found'
                }
            }

            return{
                success:true,
                message:'data fetched successfully',
                users:users,
                painters:painters,
                blockedUsers:blockedUsers,
                blockedPainter:blockedPainter
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    
    async getAllUsers() {
        try {
            let res = await userModel.find()
            // console.log(res,'users found in repoo');
            return res
        } catch (error) {
            console.log(error);
            return null
            
        }
    }
    async getAllPainters() {
        try {
            let res = await painterModel.find()
            // console.log(res,'users found in repoo');
            return res
        } catch (error) {
            console.log(error);
            return null
            
        }
    }

    async  changestatus(userId:string){
        try {
            const user = await userModel.findById(userId)

            if(user){
                user.isBlocked = ! user.isBlocked
                const success = await user.save()

                if(success){
                    return{
                        success:true,
                        message: ` ${user.isBlocked ? 'blocked' : 'Unblocked'} user`,
                        user: user
                    }
                }else{
                    return{
                        success:false,
                        message: ` ${user.isBlocked? 'Unblocked' : 'Blocked'} user`,
        
                    }
                }
            }else{
                return{
                    success:false,
                    message:'user not found'
                }
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    async  changePainterStatus(userId:string){
        try {
            const user = await painterModel.findById(userId)

            if(user){
                user.isBlocked = ! user.isBlocked
                const success = await user.save()

                if(success){
                    return{
                        success:true,
                        message: ` ${user.isBlocked ? 'blocked' : 'Unblocked'} painter`,
                        user: user
                    }
                }else{
                    return{
                        success:false,
                        message: ` ${user.isBlocked? 'Unblocked' : 'Blocked'} painter`,
        
                    }
                }
            }else{
                return{
                    success:false,
                    message:'painter not found'
                }
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    async fetchDeletePosts(){
        try {
            
            const deletepost = await PostModel.find({isDelete:true})

            if (!deletepost.length){
                return{
                    success:false,
                    message:'no deleted posts found'
                }
            }else{
                return{
                    success:true,
                    message:'delete posts fetched successfully',
                    data:deletepost
                }
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    async deletePost(postId:string){
        try {
            
            const deletePost = await PostModel.findByIdAndDelete(postId)

            if(deletePost){
                return {
                    success:true,
                    message:'post deletd successfully',
                    
                }
            }else{
                return{
                    success:false,
                    message:'error in deleting posts'
                }
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    async   graphs(){
        try {
            
            const posts = await PostModel.aggregate([
                {
                    $group: {
                      _id: { $dateToString: { format: "%Y-%m-%d", date: "$time" } },
                      count: { $sum: 1 },
                    },
                  },
                  { $sort: { _id: 1 } }, 
            ])

            if(!posts || posts.length === 0){
                return {
                    success:false,
                    message:' There are no posts to fetch'
                }
            }

            return {
                success:true,
                message:'post fetched successfully',
                posts:posts
            }
        } catch (error) {
            console.log(error);
            
        }
    }
}

export default AdminRepository