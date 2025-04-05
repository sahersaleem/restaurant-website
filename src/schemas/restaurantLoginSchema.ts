import { z } from 'zod'


export const RestaurantRegisterationSchema = z.object({
    restaurantName:z.string(),
    email:z.string().email("Invalid email"),
    password:z.string().min(6 ,"password must be atleast six character"),
    confirmPassword:z.string().min(6 ,"password must be atleast six character"),
    cuisineType:z.string(),
    PhoneNumber:z.string(),
    description:z.string(),
    address:z.string(),
    openingTime:z.string(),
    closingTime:z.string()
})


export type RestaurantRegisterationData = z.infer<typeof RestaurantRegisterationSchema>