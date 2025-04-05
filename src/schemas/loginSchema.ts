import {z} from 'zod'


export const loginSchema = z.object({
    email:z.string().email("Invalid email"),
    password:z.string().min(6 , "Password must be atleast six character")
})


export type loginFormData = z.infer< typeof loginSchema>