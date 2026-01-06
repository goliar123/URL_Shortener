import userModel from "../model/userSchema.js";
import bcrypt from 'bcrypt';


const userLogin = async({username,password})=>{
    const response = await userModel.findOne({username:username});
    if(response==null) return {completed:false}
    if(await bcrypt.compare(password,response.password)){
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
    const hashPass = await bcrypt.hash(password,10);
    console.log('password',hashPass);
    
    const response = await userModel.create({username:username,password:hashPass});

    if(response._id){
        return {completed:true}
    }
    else{
        return {completed:false}
    }
}

export {userLogin,registerUser}