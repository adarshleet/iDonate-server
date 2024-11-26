import express from 'express'
import { loginController, signUp, verifySignupOtpController } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/signup',signUp)

userRouter.post('/verifyOtp',verifySignupOtpController)

userRouter.post('/login',loginController)

export default userRouter