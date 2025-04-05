import { z } from 'zod'


export const signUpSchema = z.object({
    name:z.string().min(3),
    forename:z.string().min(3),
    email:z.string().email("Invalid email"),
    address:z.string(),
    date_of_birth:z.string().date(),
    password:z.string().min(6 , "Password must be atleast six character")
})


export type signUpformData = z.infer<typeof signUpSchema>
