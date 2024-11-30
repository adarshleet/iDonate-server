import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        match: /^[0-9]{10}$/,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    orderId:{
        type:String,
    },
    createdAt: { type: Date, default: Date.now, index: { expires: '1m' } },
}, );

const UserOtp = mongoose.model('UserOtp', userSchema);

export default UserOtp
