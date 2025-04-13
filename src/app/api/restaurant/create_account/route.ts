import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Restaurant } from "@/models/Restaurant";

import { LoginModel as Login } from "@/models/loginModel";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const { restaurantName, email, password, address } = await request.json();
   

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Login.create({
      email,
      password: hashedPassword,
      role: "owner",
    });

    const save_user = await user.save();

    const rest = await Restaurant.create({
      restaurantName,
      email,
      address,
      password: hashedPassword,

      owner: user._id,
    });

    const save_restaurnt = await rest.save();


    return NextResponse.json({ rest: save_restaurnt, user: save_user });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({ error });
  }
}
