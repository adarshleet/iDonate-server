import pkg from 'otpless-node-js-auth-sdk';
const { sendOTP,verifyOTP,resendOTP } = pkg;


export const sendOtp = async (mobile) => {
    const response = await sendOTP(`+91${mobile}`,
        null, null, 60, null, null, null,
        process.env.OTP_CLIENT_ID,
        process.env.OTP_CLIENT_SECRET
    );
    return response
}

export const resendOtp = async(orderId)=>{
    const response = await resendOTP(orderId, 
        process.env.OTP_CLIENT_ID, 
        process.env.OTP_CLIENT_SECRET
    );
    return response
}


export const verifyOtp = async(mobile,otp,orderId)=>{
    const response = await verifyOTP(null, 
        `+91${mobile}`, 
        orderId ,otp, 
        process.env.OTP_CLIENT_ID, 
        process.env.OTP_CLIENT_SECRET
    );
    return response
}