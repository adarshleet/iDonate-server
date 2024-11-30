import { verifyToken } from "otpless-node-js-auth-sdk";
import { responseStatus } from "../utils/responses";
import { STATUS } from "../constant/constant";
import { getUser } from "../models/userModel";



const authMiddleware = async (req, res, next) => {
    try {
      // 1. Extract token from Authorization header
      const token = req.headers.authorization?.split(' ')[1];
  
      if (!token) {
        return responseStatus({status:STATUS._401,message:'Authorization token is required'})
      }
  
      const decoded = verifyToken(token)
  
      const user = await getUser({_id:decoded?.id});  // Assuming decoded token has `id` field
  
      if (!user) {
        return responseStatus({status:STATUS._409,message: 'User not found'})
      }
  
      // Attach user info to request object for downstream use
      req.userId = user._id;
  
      // Call the next middleware/handler
      next();
    } catch (error) {
      console.error('Error in authentication middleware:', error);
      return responseStatus({status:STATUS._401,message: 'Invalid or expired token'})
    }
  };

  export default authMiddleware