import dbConnect from "@/lib/db";
import {  NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import { LoginModel } from "@/models/loginModel";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const { email, password } = await request.json();
    console.log(email);

    const findUserByEmail = await LoginModel.findOne({ email: email });
    console.log(findUserByEmail);

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
      { userId: findUserByEmail._id, email: findUserByEmail.email },
      process.env.JWT_SECRET_KEY!,
      { expiresIn: "1d" }
    );


    return NextResponse.json({
      token: token,
      name: findUserByEmail.name,
      password: findUserByEmail.password,
      role:findUserByEmail.role
    });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({ error });
  }
}
