import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Ad from "@/models/Ad";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { title, imageLink, link, position } = await request.json();

    console.log(title, imageLink, link, position);

    const newAdd = await new Ad({
      title,
      imageUrl: imageLink,
      link,
      position,
    });
    console.log(newAdd);
    await newAdd.save();

    return NextResponse.json({ newAdd });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({ error });
  }
}

export async function GET() {
  try {
    await dbConnect();

    const ads = await Ad.find();
    if (!ads) {
      return NextResponse.json({ message: "Ad not found" });
    }

    return NextResponse.json({ ads });
  } catch (error: any) {
    return NextResponse.json({ message: "Error occcurr while fetchind data." });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    const userId = request.nextUrl.searchParams.get("id");

    const ad = await Ad.findByIdAndDelete(userId);

    return NextResponse.json({
      message: "ad deleted succesffuly",
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: "Error occurr while deleting ad from data base",
    });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();

    const { _id, imageLink, link, title, position } = await request.json();

    const ad = await Ad.findByIdAndUpdate(_id, {
      imageUrl: imageLink,
      link,
      title,
      position,
    });

    return NextResponse.json({ status: 400 });
  } catch (error: any) {
    return NextResponse.json({
      message: "Error occurr while fetching data from data base",
    });
  }
}
