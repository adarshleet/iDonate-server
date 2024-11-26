import express from 'express'
import dotenv from 'dotenv';
import dbConnect from './src/config/dbConnect.js';
import userRouter from './src/routes/userRoutes.js';

const app = express()
dotenv.config();

dbConnect()

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRouter);


const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`server running at ${port}`)
})