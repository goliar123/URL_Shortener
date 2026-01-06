import {z} from 'zod'

const userLoginValidationSchema = z.object({
    body:z.object({
        username : z.string({
            required_error : 'username cannot be empty',
            invalid_type_error:'username should be a string'
        }).min(3,"Must be a minimum of 3 letters"),
        password : z.string({
            required_error : 'password cannot be empty',
            invalid_type_error:'password should be a string'
        }).min(6,"Must be a minimum of 6 letters"), 
    })
})

const urlCreateShortCodeValidationSchema = z.object({
    body:z.object({
        shortCode : z.string({
            required_error : 'shortCode cannot be empty',
            invalid_type_error:'shortCode should be a string'
        }),
        longCode : z.string({
            required_error : 'longCode cannot be empty',
            invalid_type_error:'longCode should be a string'
        }).url('Must be a url')
    }),
    cookies:z.object({
        id:z.string({
            required_error : 'id cannot be empty',
            invalid_type_error:'id should be a string'
        })
    })
})

const urlFetchValidationSchema = z.object({
    id : z.string({
        required_error: 'shortCode cannot be empty',
    invalid_type_error: 'shortCode must be a string',
})})

const urlDeleteValidationSchema = z.object({ 
    shortCode: z.string({
    required_error: 'shortCode cannot be empty',
    invalid_type_error: 'shortCode must be a string'
}).min(3,'ShortCode must be a minimum of 3 letters'),
    id : z.string({
        required_error: 'id cannot be empty',
        invalid_type_error: 'id must be a string'
    })
})

const urlRedirectValidationSchema = z.object({ 
    shortCode: z.string({
    required_error: 'shortCode cannot be empty',
    invalid_type_error: 'shortCode must be a string',
}).min(3,'ShortCode must be a minimum of 3 letters')
})

export {userLoginValidationSchema,urlRedirectValidationSchema,urlCreateShortCodeValidationSchema,urlDeleteValidationSchema,urlFetchValidationSchema}