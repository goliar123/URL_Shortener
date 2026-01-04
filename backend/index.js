import express, { json, urlencoded } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import urlRouter from './routes/urlRoutes.js';
import userRouter from './routes/userRoutes.js';
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app = express();

const errorHandler = (err, req, res, next) => {
    // 1. Determine status code (use 500 if not specified)
    const statusCode = res.statusCode ? res.statusCode : 500;

    res.status(statusCode);

    // 2. Send JSON response (Instead of crashing or sending HTML)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Hide stack in production
    });
};

dotenv.config();
app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true // Enable cookies
}))
app.use(express.json())
app.use(urlencoded({extended:true}))
app.use(cookieParser())
app.use("/url",urlRouter)
app.use("/user",userRouter)
app.use(errorHandler)




app.listen(process.env.PORT,async ()=>{
    await mongoose.connect(process.env.MONGOOSE_URL)
    console.log('Connected to MONGODB');
    console.log(`Listening at PORT ${process.env.PORT}`);
})