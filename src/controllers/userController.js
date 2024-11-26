import { loginService, signupService, verifySignupOtpService } from "../services/userServices.js"
import { error500, responseStatus,  } from "../utils/responses.js"



export const signUp = async(req,res)=>{
    try {
        console.log(req.body)
        const response = await signupService(req.body)
        return responseStatus(res,response)
    } catch (error) {
        return error500(res,error)
    }
}

export const verifySignupOtpController = async(req,res)=>{
    try {
        console.log('verifyotp called')
        const response = await verifySignupOtpService(req.body)
        console.log(response,'respp')
        return responseStatus(res,response)
    } catch (error) {
        return error500(res,error)
    }
}


//user login
export const loginController = async(req,res)=>{
    try {
        const response = await loginService(req.body)
        return responseStatus(res,response)
    } catch (error) {
        return error500(res,error)
    }
}