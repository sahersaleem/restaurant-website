import {z} from 'zod'


export const featuredSchema = z.object({
  price:z.number()
})


export type featuredSchemaType = z.infer< typeof featuredSchema>