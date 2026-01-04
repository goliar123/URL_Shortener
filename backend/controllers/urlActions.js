import urlModel from "../model/urlSchema.js";

const addShortCode = async({shortCode,longCode,createdBy})=>{
    const url = await urlModel.findOne({createdBy:createdBy,longCode:longCode});
    if(url==undefined){
        const response = await urlModel.create({shortCode:shortCode,longCode:longCode,createdBy:createdBy,clicks:0});
        return {completed:true}
    }
    else{
        return {completed:false}
    }
}

const fetchUrl = async(createdBy)=>{
    const response = await urlModel.find({createdBy:createdBy});
    console.log(response);
    return {response,completed:true};

}

const deleteUrl = async(createdBy,shortCode)=>{
    const response = await urlModel.deleteOne({createdBy:createdBy,shortCode:shortCode});
    return {response,completed:true};
}

const updateInfo = async(shortCode,req)=>{
    const {createdBy} = req.body;
    const time = new Date().toLocaleDateString();
    const response = await urlModel.updateOne({createdBy:createdBy,shortCode:shortCode},{
        $push:{
            visitedHistory:{
                time:time,
                ip:req.ip,
                device:req.headers['user-agents'],
            }
        },
        $inc:{
            clicks:1
        }
    });
    console.log(response)    
    return {response,completed:true};
}

export {addShortCode,fetchUrl,deleteUrl,updateInfo}