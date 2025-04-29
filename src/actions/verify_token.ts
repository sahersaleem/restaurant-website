"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function verify_token() {
  const token = cookies().get("token")?.value;

  if (!token) {
    return { isAuthenticated: false, role: null };
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    console.log(decoded)
    return { isAuthenticated: true, role: decoded.role };
  } catch (error) {
    return { isAuthenticated: false, role: null };
  }
}
