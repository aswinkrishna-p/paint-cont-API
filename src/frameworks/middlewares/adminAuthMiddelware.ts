import jWTService from "../services/jwtService";
import { Next, Req, Res } from "../types/serverPackageTypes";

const JWT = new jWTService()

const adminAuthMiddleware = async (req:Req,res:Res,next:Next) => {
    try {
        const token = req.cookies.admin_token

        if(!token){
            return res.status(401).json({
                success:false,
                message:'unauthorized request'
            });

        }

        const checktoken = await JWT.verifyToken(token)

        if(!checktoken.success || checktoken.role !=='admin'){
            return res.status(401).json({
                success:false,
                message:'unauthorized request'
            });
        }

        return next()
    } catch (error) {
        console.log(error);
        
    }
}