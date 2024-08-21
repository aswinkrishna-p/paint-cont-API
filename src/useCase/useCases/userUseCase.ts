import { Iuser } from "../../entity/userEntity";
import userRepository from "../../frameworks/database/repository/user-repository";
import { Encrypted } from "../../frameworks/services/hashPassword";
import jWTService from "../../frameworks/services/jwtService";
import { Document, ObjectId, Schema, Types } from "mongoose";
import { Iotp } from "../../entity/otp";
import { SlotInterface } from "../../entity/slotsEntity";
import stripeRepository from "../../frameworks/database/repository/stripe_repository";
import { Req } from "../../frameworks/types/serverPackageTypes";


const bcrypt = new Encrypted()
const JWT = new jWTService()

class Userusecase {
  private userRepository: userRepository;
  private StripeRepository: stripeRepository

  constructor(
    userRepository: userRepository ,
    StripeRepository:stripeRepository
  ) {
    this.userRepository = userRepository;
    this.StripeRepository = StripeRepository
  }

  async Register(user:| Iuser  | (Document<unknown, {}, Iotp> & Iotp & { _id: Types.ObjectId }) | undefined ) {
  
    const Rdata = await this.userRepository.saveuser(user);
    return {
      status: 200,
      message: Rdata.message,
      data: Rdata.data,
    };
  
}


  async login(user: Iuser) {
    console.log("inside login");
    try {
      const userdata = await this.userRepository.login(user.email);

      if (!userdata) {
        return {
          success: false,
          message: "user not found",
        };
      } else {
        if (userdata.isBlocked) {
          return {
            success: false,
            message: "user blocked by admin",
          };
        }

        const validpass = await bcrypt.comparePass(
          user.password,
          userdata.password
        );

        userdata.password = "";

        if (validpass) {
          const token = await JWT.createToken(
            userdata._id as string,
            "user"
          );
          // console.log(token,'token indakiii');

          if (token) {
            return {
              status: 200,
              success: true,
              message: "valid user",
              data: userdata,
              token: token,
            };
          } else {
            return {
              success: false,
              message: "error in token generation",
            };
          }
        } else {
          return {
            success: false,
            message: "Invalid Credentials",
          };
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addUserAddress(address:any,phoneNo:Number,userId:string){
console.log('inside usecaseee');

    const newUserAddress = {
        houseNo: address.houseNo,
        location: address.location, 
        pin: address.pin
    }

    const saveAddress = await this.userRepository.addAddress(newUserAddress,phoneNo,userId)

    if(saveAddress?.success){
        return{
            success:true,
            message:'user address added successfuly'
        }
    }else{
        return{
            success:false,
            message:'error adding user address'
        }
    }
  }

  async searchForPainter(name:string){
    try {
      const result = await this.userRepository.searchPainter(name)

      if(result){
        return{
          success:true,
          message:result.message,
          data:result.data
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

async  saveuserprofile(userId:string,imageUrl:string){
    try {
       const photoSaved = await this.userRepository.saveprofilepic(userId,imageUrl)

       if(photoSaved){
          return {
            success:true,
            message:'image updated successfully'
          }
       }else{
        return{
          success:false,
          message:'Error while updating profile pic'
        }
       }
    } catch (error) {
      console.log(error);
      
    }
}


async contactMessages(name:string,mail:string,message:string){
  try {
    
    const response = await this.userRepository.saveContacts(name,mail,message)

    if(response?.success){
      return {
        success:true,
        message:response.message
      }
    }else{
      return{
        success:false,
        message:response?.message
      }
    }
  } catch (error) {
    console.log(error);
    
  }
}

async slotPayment(req:Req,userId:string,slotId:string){
  try {

    const payment = await this.StripeRepository.stripePayment( req, userId,slotId)


    if(payment?.success){
      return {
        success:true,
        data:payment.data
      }
    }
    
  } catch (error) {
    console.log(error);
    
  }
}

async paymentWebhook(req:any){
  try {
    
    const result = await this.StripeRepository.PaymentSuccess(req)

    console.log(result,'result in usecase');
    
    return result
  } catch (error) {
    console.log(error);
    
  }
}


}




export default Userusecase