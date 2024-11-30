import { STATUS } from "../constant/constant.js"
import { createUser, deleteUser, getUser, updateUser } from "../models/userModel.js"
import { createUserOtp, deleteUserOtp, getUserOtp } from "../models/userOtpModel.js"
import { comparePassword, hashPassword } from "../utils/bcryptPassword.js"
import { generateToken } from "../utils/jwtToken.js"
import { sendOtp, verifyOtp } from "../utils/otpServices.js"

export const signupService = async(data)=>{

    //check mobile already existing on database
    const userExist = await getUser({mobile:data.mobile})
    console.log('userrr',userExist)
    if(userExist){
        return { status: STATUS._409, message: "Mobile Number already in use." }
    }

    //hash password
    data.password = await hashPassword(data.password)

    //send otp function
    const otpResponse = await sendOtp(data.mobile)
    console.log(otpResponse,"otpresponsee")
    data.orderId = otpResponse.orderId

    //saving user otp orderid
    await deleteUserOtp({mobile:data.mobile})
    const savedUser = await createUserOtp(data);

    return {status : STATUS._200, message: "OTP sent succesfully." }

}


//verify otp service
export const verifySignupOtpService = async(data)=>{
    console.log(data)
    const userOtp = await getUserOtp({mobile:data.mobile})
    const {mobile,password,name} = userOtp
    if(!userOtp){
        return { status: STATUS._409, message: "Invalid OTP"}
    }
    const verifyStatus =  await verifyOtp(data.mobile,data.otp,userOtp.orderId)
    console.log(verifyStatus,'statusv')
    if(verifyStatus.isOTPVerified){
        await createUser({name,mobile,password})
        return {status : STATUS._200, message: "OTP verified succesfully." }
    }
    else{
        return { status: STATUS._409, message: "Invalid OTP"}
    }
}

//user login service
export const loginService = async(data)=>{
    const userFound = await getUser({mobile:data?.mobile})
    if(userFound){
        const passwordMatch = await comparePassword(data.password,userFound.password)
        if(passwordMatch){
            const token = generateToken({id:userFound._id})
            return {status : STATUS._200, message: "Login Successful.",data:{token:token} }
        }
    }
    return { status: STATUS._409, message: "Invalid Email or Password"}
}