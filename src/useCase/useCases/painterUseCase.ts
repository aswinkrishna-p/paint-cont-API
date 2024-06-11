import { Iotp } from "../../entity/otp";
import { Ipainter } from "../../entity/painterEntity";
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
          // console.log(token,'token indakiii');

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
    } catch (error) {}
  }
}

export default PainterUseCase;
