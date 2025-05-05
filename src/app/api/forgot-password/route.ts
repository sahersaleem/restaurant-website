import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";

import Jwt from "jsonwebtoken";
import { LoginModel } from "@/models/loginModel";

import { sendConfirmationEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const { email } = await request.json();
    console.log(email)

    const findUserByEmail = await LoginModel.findOne({ email: email });
    if (!findUserByEmail)
      return NextResponse.json({ message: "User not found!" });

    const token = Jwt.sign(
      {
        userId: findUserByEmail._id,
      },
      process.env.JWT_SECRET_KEY!,
      {
        expiresIn: "15m",
      }
    );
  

  console.log(token);
  
    const resetLink = `${process.env.NEXT_PUBLIC_DOMAIN!}/reset-password?token=${token}`;

    await sendConfirmationEmail(email, resetLink);

    return NextResponse.json({
      message: "Messsage send successfully!",
    });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({ error });
  }
}
