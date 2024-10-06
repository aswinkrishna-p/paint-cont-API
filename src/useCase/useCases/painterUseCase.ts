import { Iotp } from "../../entity/otp";
import { Ipainter } from "../../entity/painterEntity";
import { SlotInterface } from "../../entity/slotsEntity";
import painterRepository from "../../frameworks/database/repository/painter-repository";
import { Encrypted } from "../../frameworks/services/hashPassword";
import jWTService from "../../frameworks/services/jwtService";
import { Document, ObjectId, Schema, Types } from "mongoose";

const bcrypt = new Encrypted();
const JWT = new jWTService();

class PainterUseCase {
  private painterRepository: painterRepository;

  constructor(painterRepository: painterRepository) {
    this.painterRepository = painterRepository;
  }

  async Register(
    painter:
      | Ipainter
      | (Document<unknown, {}, Iotp> & Iotp & { _id: Types.ObjectId })
      | undefined
  ) {
    const Rdata = await this.painterRepository.saveuser(painter);
    return {
      status: 200,
      message: Rdata.message,
      data: Rdata.data,
    };
  }

  async login(painter: Ipainter) {
    console.log("inside login");
    try {
      const userdata = await this.painterRepository.findByEmail(painter.email);

      if (!userdata) {
        return {
          success: false,
          message: "user not found",
        };
      } else {
        if (!userdata.status) {
          return {
            success: false,
            message: "user blocked by admin",
          };
        }

        const validpass = await bcrypt.comparePass(
          
          painter.password,
          userdata.data.password
        );
       

        userdata.data.password = "";

        if (validpass) {
          const token = await JWT.createToken(
            userdata.data._id as string,
            "painter"
          );
          

          if (token) {
            return {
              status: 200,
              success: true,
              message: "valid user",
              data: userdata?.data,
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

  async updatepass(email:string,newpass:string){

    try {
      const hashpass = await bcrypt.hashpass(newpass)
  
      const res = await this.painterRepository.updatepass(email,hashpass)
  
      if(res?.success){
        return{
          success:true,
          message:res.message
        }
      }else{
        return{
          success:false,
          message:res?.message
        }
      }
    } catch (error) {
      console.log(error);
      
    }
    }

  async getpainter(painterid: string) {
    try {
      const painter = await this.painterRepository.getpainter(painterid);
      if (painter) {
        return {
          success: true,
          data: painter,
        };
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

  async fetchDash(painterId:string){
    try {
      
      const response = await this.painterRepository.fetchDashBoard(painterId)

      if (response?.success) {
        return {
          success: true,
          data: response.data,
          message:response.message
        };
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

  async saveSlots(painterid:string,slot:SlotInterface[]){
    try {
      console.log(slot[0].date,'slotttttttttt');
      
      const savedata = await this.painterRepository.saveslots(painterid,slot)

      if(savedata?.success){
        return {
          success:true,
          message:savedata.message
        }
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  async updateSlots(date:string,amount:string , slotId:string){
    try {
      
      const updated = await this.painterRepository.editSlots(date,amount,slotId)

      if(updated?.success){
        return{
          success:true,
          message:updated.message
        }
      }else{
        return{
          success:false,
          message:updated?.message
        }
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  async removeSlots(slotId:string){
    try {
      
      const result = await this.painterRepository.deleteSlot(slotId)

      if(result?.success){
        return{
          success:true,
          message:result.message
        }
      }else{
        return{
          success:false,
          message:result?.message
        }
      }

    } catch (error) {
      console.log(error);
      
    }
  }

  async updateFollowers(painterId:string,userId:string){
    try {
      
      const followPainter = await this.painterRepository.addFollowers(painterId,userId)
      if(followPainter?.success){
        return {
          success:true,
          data:followPainter.data,
          message:followPainter.message
        }
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  async getfollowers(painterid:string){
    try {
      const res = await this.painterRepository.followersList(painterid)

      if(res){
          return {
            success:true,
            data:res
          }
      }

    } catch (error) {
      console.log(error);
      
    }
  }

  async saveuserprofile(userId: string, imageUrl: string) {
    try {
      const photoSaved = await this.painterRepository.saveprofilepic(
        userId,
        imageUrl
      );

      if (photoSaved) {
        return {
          success: true,
          message: "image updated successfully",
        };
      } else {
        return {
          success: false,
          message: "Error while updating profile pic",
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async CreatePost(painterId: string, description: string, media: string) {
    try {
      console.log("insdie the postusecase");

      const savepost = await this.painterRepository.savePost(
        painterId,
        media,
        description
      );

      if (savepost) {
        return {
          success: true,
          message: "post uploaded successfully",
        };
      } else {
        return {
          success: false,
          message: "error while uploading post",
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateDetails(painterId: string, details: Object) {
    try {
      const updateDetails = await this.painterRepository.updatePainterDetails(
        painterId,
        details
      );

      if (updateDetails) {
        return {
          success: true,
          message: updateDetails.message,
        };
      } else {
        return {
          success: false,
          message: " error in updating details",
        };
      }
    } catch (error) {
      console.log(error);
      
    }
  }
}

export default PainterUseCase;
