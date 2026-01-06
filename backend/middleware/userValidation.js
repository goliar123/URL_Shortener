import {z} from 'zod'
import {userLoginValidationSchema} from '../model/validationSchema.js'
import expressAsyncHandler from 'express-async-handler'

const userLoginValidation = expressAsyncHandler((req,res,next) => {
    const data = userLoginValidationSchema.parse({
        body: req.body,
    })
    next();
})




export default userLoginValidation