import dbConnect from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

import { Complain } from "@/models/complain";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { subject, complain } = await request.json();
    console.log(subject, complain);

    const newcomplain = await new Complain({
      subject,
      complain,
      isResolved: false,
    });

    await newcomplain.save();

    return NextResponse.json({ newcomplain });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({ error });
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const allComplains = await Complain.find();

    if (!allComplains) {
      return NextResponse.json({ status: 404 });
    }

    return NextResponse.json({ complains: allComplains });
  } catch (error: any) {
    return NextResponse.json({
      message: "Error occir while fetching all complains",
    });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const { id, isResolved } = await request.json();

    const resolvedComplains = await Complain.findByIdAndUpdate(id, {
      isResolved,
    });
    console.log(resolvedComplains);

    if (!resolvedComplains) {
      return NextResponse.json({ status: 404 });
    }

    return NextResponse.json({ complains: resolvedComplains });
  } catch (error: any) {
    return NextResponse.json({
      message: "Error occir while fetching all complains",
    });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    const deleteComplain = await Complain.findByIdAndDelete(id);
    return NextResponse.json({ message: "Complain deleted successfully" });
  } catch (error) {
    return NextResponse.json({message:"Error occurr while delteing complain"})
  }
}
