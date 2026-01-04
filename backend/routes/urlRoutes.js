import express from 'express'
import {addShortCode,deleteUrl,fetchUrl, updateInfo} from '../controllers/urlActions.js';
import asyncHandler from 'express-async-handler' 
import verify from '../middleware/verify.js';


const router = express.Router()

router.post("/url",verify,asyncHandler(async (req,res)=>{
    const {shortCode,longCode,createdBy} = req.body;
    const response = await addShortCode({shortCode,longCode,createdBy})

    if(response.completed===true){
        res.status(201).json({message:"Created URL",completed:true});
    }
    else{
        throw new Error("Error while creating URL // Longcode already has a Shortcut");
    }
}))

router.get('/url',asyncHandler(async(req,res)=>{
    const {createdBy} = req.body;
    const response = await fetchUrl(createdBy);
    if(response.completed==true){
        if(response.response.length==0){
            res.json({message:'No entries Created'});
        }
        else{
            res.json(response.response);
        }
    }
    else{
        throw new Error("Error while Fetching URL")
    }
}))

router.delete('/delete',asyncHandler(async(req,res)=>{
    const {createdBy,shortCode} = req.body;
    const response = await deleteUrl(createdBy,shortCode);
    if(response.completed==true){    
        if(response.response.deletedCount===0){
            res.json({message:"No entries"});
        }
        else res.json({message:'Deleted Sucessfully'});
    }
    else{
        throw new Error("Error while deleting URL")
    }
}))

router.get('/redirect/:shortCode',asyncHandler(async(req,res)=>{
    const shortCode = req.params.shortCode;
    const response = await updateInfo(shortCode,req);
    if(response.completed==true){    
        if(response.response.matchedCount===0){
            res.json({message:"No such URL exists"});
        }
        else res.json({message:'Redirected Successfully'});
    }
    else{
        throw new Error("Error while Redirecting to the URL")
    }
}))


export default router