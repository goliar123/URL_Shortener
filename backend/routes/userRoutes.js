import express from 'express'
import asyncHandler from 'express-async-handler'
import { userLogin,registerUser } from '../controllers/userActions.js'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

const router = express.Router()
dotenv.config()

router.post('/login',asyncHandler(async (req,res)=>{
    const {username,password} = req.body;
    const response = await userLogin({username,password});
    if(response.completed===true){
        const token = jwt.sign({username:response.response.username,id:response.response._id},process.env.Secret_key)
        res.cookie('token',token,{httpOnly:true,maxAge:24*60*60*60})
        res.json({message:'Login Successful'})
    }
    else{
        throw new Error({message:'Login UnSuccessful'});
    }
}))

router.post('/register',asyncHandler(async (req,res)=>{
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