import { z } from 'zod'


export const RestaurantRegisterationSchema = z.object({
    restaurantName:z.string(),
    email:z.string().email("Invalid email"),
    password:z.string().min(6 ,"password must be atleast six character"),
    address:z.string()
    

}
)

export type RestaurantRegisterationData = z.infer<typeof RestaurantRegisterationSchema>