import {z} from 'zod'
import { urlCreateShortCodeValidationSchema,urlDeleteValidationSchema,urlFetchValidationSchema,urlRedirectValidationSchema } from '../model/validationSchema.js'
import expressAsyncHandler from 'express-async-handler'

const urlCreateShortCodeValidation = expressAsyncHandler((req,res,next)=>{
    urlCreateShortCodeValidationSchema.parse({
        body: req.body,
        cookies:req.cookies
    })
    next();
})

const urlFetchValidation = expressAsyncHandler((req,res,next)=>{
    urlFetchValidationSchema.parse({
        id : req.cookies.id
    })
    next();
})
const urlDeleteValidation = expressAsyncHandler((req,res,next)=>{
    urlDeleteValidationSchema.parse({
        shortCode : req.body.shortCode,
        id : req.cookies.id
    })
    next();
})
const urlRedirectValidation = expressAsyncHandler((req,res,next)=>{
    urlRedirectValidationSchema.parse({
        shortCode : req.params.shortCode
    })
    next();
})

export {urlCreateShortCodeValidation,urlDeleteValidation,urlFetchValidation,urlRedirectValidation}