import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import { LoginModel } from "@/models/loginModel";
import { serialize } from "cookie";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const { email, password, rememberMe } = await request.json();


    const findUserByEmail = await LoginModel.findOne({ email: email });


    if (findUserByEmail.email === "saleemsaba281@gmail.com") {
      const updateUser = await LoginModel.updateOne(
        { email: "saleemsaba281@gmail.com" },
        { role: "admin" }
      );
     
    }

    if (!findUserByEmail) {
      return NextResponse.json({ message: "user not found" });
    }

    const comparedPassword = await bcrypt.compare(
      password,
      findUserByEmail.password
    );

    if (!comparedPassword) {
      return NextResponse.json({ message: "Invalid credentials", status: 401 });
    }

    const token = Jwt.sign(
      { userId: findUserByEmail._id, email: findUserByEmail.email , role:findUserByEmail.role},
      process.env.JWT_SECRET_KEY!,
      { expiresIn: rememberMe ? "7d" : "1h" }
    );


    console.log(token)
    const cookie = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: rememberMe ? 60 * 60 * 24 * 7 : 60 * 60, // 7 days or 1 hr
      sameSite: "lax",
    });

    const response = NextResponse.json({
      token: token,
      name: findUserByEmail.name,
      role: findUserByEmail.role,
      cookie,
    });
    response.headers.set("Set-Cookie", cookie);
    return response;
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({ error });
  }
}
