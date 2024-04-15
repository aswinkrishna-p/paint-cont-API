import jwt,{JwtPayload} from 'jsonwebtoken'
require("dotenv").config()

export interface TokenService {
    createToken(data:string,role:string):Promise<string>
}

interface DecodeToken extends JwtPayload{
    role:string
}

const secretKey: string = process.env.JWT_SECRET_KEY || "";

export default class jWTService implements TokenService {

     async createToken(data: string, role: string): Promise<string> {
        try {
            const token = jwt.sign({ userData: data, role: role }, secretKey, {
                expiresIn: "24h",
            });
            // console.log("TokenType", typeof token, token);
            return token;
        } catch (error: any) {
            console.log(error.message);
            throw error;
        }
    }

    async verifyToken(tokenData: string) {
        try {
            const token = jwt.verify(tokenData, secretKey);
            if (!token)
                return {
                    //invalid token handling
                    success: true,
                    status: 401,
                    message: "Unauthorized Access",
                };
            // console.log("Token", token)
            const decodedToken = token as DecodeToken; //to add role to default token structure
            return {
                success: true,
                status: 200,
                data: decodedToken,
                role: decodedToken?.role,
            };
        } catch (error) {
            console.log((error as Error).message);
            return {
                status: 400,
                message: (error as Error).message,
            };
        }
    }
}