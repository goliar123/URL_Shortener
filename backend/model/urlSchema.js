import mongoose, { Schema } from "mongoose";

const urlSchema = mongoose.Schema({
    shortCode:{
        type:String,
        required:true,
    },
    longCode:{
        type:String,
        required:true,
    },
    createdBy:{
        type:String,
        required:true,
    },
    visitedHistory:[{
        time:{
            type:String,
            required:true,
        },
        ip:{
            type:String,
            required:true,
        },
        device:{
            type:String,
            required:true,
        }
    }],
    clicks:{
        type:Number,
        required:true,
    }
},{timestamps:true})

const urlModel = mongoose.model('urlModel',urlSchema);

export default urlModel