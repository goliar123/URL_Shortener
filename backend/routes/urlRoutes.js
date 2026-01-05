import express from 'express'
import {addShortCode,deleteUrl,fetchUrl, updateInfo} from '../controllers/urlActions.js';
import asyncHandler from 'express-async-handler' 
import verify from '../middleware/verify.js';


const router = express.Router();

router.post("/url",verify,asyncHandler(async (req,res)=>{
    const {shortCode,longCode} = req.body;
<<<<<<< HEAD
    const createdBy = req.cookies.id;
=======
    const createdBy = req.user.id;
    console.log(req.user.id);
    
>>>>>>> 9759897a0b76df175473ccf4ebdcdecc54368716
    const response = await addShortCode({shortCode,longCode,createdBy})

    if(response.completed===true){
        res.status(201).json({message:"Created URL",completed:true});
    }
    else{
        throw new Error("Error while creating URL // Longcode already has a Shortcut");
    }
}))

<<<<<<< HEAD
router.get('/url',asyncHandler(async(req,res)=>{    
    const createdBy = req.cookies.id;
=======
router.get('/url',verify,asyncHandler(async(req,res)=>{
    const createdBy = req.user.id;
>>>>>>> 9759897a0b76df175473ccf4ebdcdecc54368716
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

<<<<<<< HEAD
router.delete('/delete',asyncHandler(async(req,res)=>{
    const {shortCode} = req.body;
    const createdBy = req.cookies.id;
=======
router.delete('/delete',verify,asyncHandler(async(req,res)=>{
    const {shortCode} = req.body;
    const createdBy = req.user.id;
>>>>>>> 9759897a0b76df175473ccf4ebdcdecc54368716
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
<<<<<<< HEAD
    console.log(req.params);
    
    const response = await updateInfo(shortCode,req);
=======
    const createdBy = req.cookies.id;
    const response = await updateInfo(shortCode,createdBy,req);
>>>>>>> 9759897a0b76df175473ccf4ebdcdecc54368716
    if(response.completed==true){    
        if(response.response.matchedCount===0){
            res.json({message:"No such URL exists"});
        }
<<<<<<< HEAD
        else res.redirect(response.longCode);
=======
        else {
            res.redirect(response.longCode);
        }
>>>>>>> 9759897a0b76df175473ccf4ebdcdecc54368716
    }
    else{
        throw new Error("Error while Redirecting to the URL")
    }
}))


export default router