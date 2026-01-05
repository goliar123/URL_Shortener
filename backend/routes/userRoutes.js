import express from 'express'
import asyncHandler from 'express-async-handler'
import { userLogin,registerUser } from '../controllers/userActions.js'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

const router = express.Router()
dotenv.config()

router.post('/login',asyncHandler(async (req,res)=>{    
    const {username,password} = req.body;
    console.log(username,password);
    
    const response = await userLogin({username,password});
    if(response.completed===true){
        const token = jwt.sign({username:response.response.username,id:response.response._id},process.env.Secret_key)
<<<<<<< HEAD
        res.cookie('token',token,{httpOnly:true,maxAge:24*60*60*60})
        .cookie('id',response.response._id)
        .json({message:'Login Successful'})
=======
        res.cookie('token',token,{httpOnly:true,maxAge:24*60*60*60}).cookie('id',response.response._id,{httpOnly:true,maxAge:24*60*60*60}).json({message:'Login Successful'})
>>>>>>> 9759897a0b76df175473ccf4ebdcdecc54368716
    }
    else{
        throw new Error({message:'Login UnSuccessful'});
    }
}))

router.post('/register',asyncHandler(async (req,res)=>{
    console.log(req);
    const {username,password} = req.body;
    const response = await registerUser({username,password});
    if(response.completed===true){
        if(response.alreadyPresent){
            res.json({message:'Account Already Present'})
        }
        else{
            res.json({message:'Registration Successful'})
        }
    }
    else{
        throw new Error({message:'Registration UnSuccessful'});
    }
}))

export default router