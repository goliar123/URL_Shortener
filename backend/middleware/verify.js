import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import dotenv from 'dotenv'


const verify = asyncHandler((req,res,next)=>{
    const token = req.cookies.token
    const response = jwt.verify(token,process.env.Secret_key)    
    if(response){
        req.user = response;
        next();
    }
    else{
        res.json("Error, are u logged In ??");
    }
})

export default verify