import {z} from 'zod'


export const AdSchema = z.object({
   title:z.string(),
   imageUrl:z.string(),
   link:z.string()
})


export type AdSchemaType = z.infer< typeof AdSchema>