"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function checkAUth() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return false;
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY!);

    return true;
  } catch (error: any) {
    return error.message;
  }
}

export async function get_user_role() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  const decoded = jwt.verify(token!, process.env.JWT_SECRET_KEY!) as any;
  if(decoded.role){
    return decoded.role
  }
  else{
    return null
  }
  return decoded.role;
}
