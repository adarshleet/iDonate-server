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
    isVerified:{
        type:Boolean,
        required:true
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User
