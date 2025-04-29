import dbConnect from "@/lib/db";
import {  NextResponse } from "next/server";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import {LoginModel as Login } from "@/models/loginModel";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const { name, forename, email, password, town, date_of_birth } =
      await request.json();

    const hashedpassword = await bcrypt.hash(password, 10);

    const user = await new User({
      name,
      forename,
      email,
      password: hashedpassword,
      town,
      date_of_birth,
    });

    const user_login = await new Login({
      email,
      password: hashedpassword,
    });

    const save_User = await user.save();
    await user_login.save();

    return NextResponse.json({ save_User });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({ error });
  }
}
