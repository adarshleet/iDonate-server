import { STATUS } from "../constant/constant.js"
import { createUser, deleteUser, getUser, updateUser } from "../models/userModel.js"
import { comparePassword, hashPassword } from "../utils/bcryptPassword.js"
import { verifyOtp } from "../utils/otpServices.js"

export const signupService = async(data)=>{

    //check mobile already existing on database
    const userExist = await getUser({mobile:data.mobile})
    if(userExist){
        return { status: STATUS._409, message: "Mobile Number already in use." }
    }

    //hash password
    data.password = await hashPassword(data.password)

    //saving user
    const savedUser = await createUser(data)

    //send otp function


    if(savedUser){
        // Set a timeout to delete the user if OTP is not verified in 1 minutes
        setTimeout(async () => {
            const userInDb = await getUser({_id:savedUser._id})
            if (userInDb && !userInDb.isVerified) {
                // Delete user after 2 minutes if OTP is not verified
                await deleteUser({ _id: savedUser._id })
                console.log(`User ${savedUser._id} removed due to OTP not being verified.`);
            }
        }, 60000); // 1 minutes timeout
    }

    console.log('here2')

    return {status : STATUS._200, message: "OTP sent succesfully." }

}


//verify otp service
export const verifySignupOtpService = async(data)=>{
    console.log(data)
    const verifyStatus =  await verifyOtp(data.mobile,data.otp)
    if(verifyStatus){
        // const updateQuery = { isVerifie
        const matchQuery = {mobile: data.mobile}
        const updateQuery = {$set:{ isVerified: true }}
        await updateUser(
         matchQuery,updateQuery
        )
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
            return {status : STATUS._200, message: "Login Successful." }
        }
    }
    return { status: STATUS._409, message: "Invalid Email or Password"}
}