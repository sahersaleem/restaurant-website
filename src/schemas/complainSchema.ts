import {z} from 'zod'


export const complainSchema = z.object({
    subject:z.string(),
    complain:z.string()
})


export type ComplainSchemaType = z.infer< typeof complainSchema>