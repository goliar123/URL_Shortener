import userModel from "../model/userSchema.js";

const userLogin = async({username,password})=>{
    const response = await userModel.findOne({username:username});
    if(response.password===password){
        return {completed:true,response}
    }   
    else{
        return {completed:false}
    }
}

const registerUser = async({username,password})=>{
    const prev = await userModel.findOne({username:username});
    if(prev!=null){
        return {completed:true,alreadyPresent:true}
    }
    const response = await userModel.create({username,password});

    if(response._id){
        return {completed:true}
    }
    else{
        return {completed:false}
    }
}

export {userLogin,registerUser}