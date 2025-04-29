import { LoginModel } from "@/models/loginModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const { token, password } = await request.json();
    console.log('token ' , token);
    console.log('password' , password)
    
    
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
   const hashedPassword = await bcrypt.hash(password, 10);

   const updateLoginUser = await LoginModel.findByIdAndUpdate(decoded.userId , {
    password:hashedPassword
   })

    return NextResponse.json({ message: "User password reset successfully!" });
  } catch (error: any) {
    return NextResponse.json({ meessage: "Error occur while reset password!" });
  }
}
