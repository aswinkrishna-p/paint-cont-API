import { Ipainter } from "../../entity/painterEntity";
import painterRepository from "../../frameworks/database/repository/painter-repository";
import { Encrypted } from "../../frameworks/services/hashPassword";
import jWTService from "../../frameworks/services/jwtService";

const bcrypt = new Encrypted();
const JWT = new jWTService();

class PainterUseCase {
  private painterRepository: painterRepository;

  constructor(painterRepository: painterRepository) {
    this.painterRepository = painterRepository;
  }

  async Register(painter: Ipainter) {
    const checkemail = await this.painterRepository.findByEmail(painter.email);

    if (checkemail) {
      return {
        status: 400,
        message: "User already exists",
      };
    } else {
      const newPassword = await bcrypt.hashpass(painter.password);
      painter.password = newPassword;

      const Rdata = await this.painterRepository.saveuser(painter);
      return {
        status: 200,
        message: Rdata.message,
        data: Rdata.data,
      };
    }
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
}

export default PainterUseCase;
