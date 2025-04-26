import dbConnect from "@/lib/db";
import { LoginModel } from "@/models/loginModel";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const users = await User.find();

    if (!users) {
      return NextResponse.json({ message: "Users not found", status: "404" });
    }

    return NextResponse.json({ users });
  } catch (error: any) {
    return NextResponse.json({
      message: "Error occurr while fetching data from data base",
    });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();

    const { data } = await request.json();

    const user = await User.findByIdAndUpdate(data.id, { role: data.role });
    const login = await LoginModel.findOneAndUpdate(
      { user: data.id },
      { role: data.role }
    );
    await user.save();
    await login.save()

    return NextResponse.json({ status: 400 });
  } catch (error: any) {
    return NextResponse.json({
      message: "Error occurr while fetching data from data base",
    });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    const userId = request.nextUrl.searchParams.get("userId");

    const deleted_user = await User.findByIdAndDelete(userId);

    return NextResponse.json({
      message: "User deleted succesffuly",
      status: 200,
    });

    return NextResponse.json({ status: 400 });
  } catch (error: any) {
    return NextResponse.json({
      message: "Error occurr while deleting user from data base",
    });
  }
}
