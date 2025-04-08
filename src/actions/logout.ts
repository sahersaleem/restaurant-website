

'use server'


import { cookies } from 'next/headers'
export const logout = async()=>{

const cookie = cookies()
const deleteCookies = cookie.delete('token')

return deleteCookies





}