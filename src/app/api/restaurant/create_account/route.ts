import dbConnect from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Restaurant } from "@/models/Restaurant";
import { User } from "@/models/User";
import { LoginModel as Login } from "@/models/loginModel";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const {
      restaurantName,
      email,
      password,
      confirmPassword,
      cuisineType,
      PhoneNumber,
      description,
      openingTime,
      closingTime,
      address,
    } = await request.json();

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
      confirmPassword: hashedPassword,
      PhoneNumber,
      cuisineType,
      address,
      password: hashedPassword,
      description,
      openingTime,
      closingTime,
      owner: user._id,
    });
    // console.log(rest);

    const save_restaurnt = await rest.save();

    // console.log("SAVE_RESTAURANT", save_restaurnt);
    // console.log("SAVE_USER", save_user);

    return NextResponse.json({ rest: save_restaurnt, user: save_user });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({ error });
  }
}
