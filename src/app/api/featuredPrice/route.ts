import dbConnect from "@/lib/db";
import AdminSettings  from "@/models/AdminSettings";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const price = await AdminSettings.find()
    return NextResponse.json({ price });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const id = request.nextUrl.searchParams.get("id");
    const { price } = await request.json();
    const findAndUpdate = await AdminSettings.findByIdAndUpdate(id, {
        featuredPrice: price,
    });
    return NextResponse.json({ findAndUpdate });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}








export async function POST(request: NextRequest) {
    try {
      await dbConnect();
      const { price } = await request.json();
      const newPrice = await AdminSettings.create( {
          featuredPrice: price,
      });
      return NextResponse.json({ newPrice });
    } catch (error: any) {
      return NextResponse.json({ error: error.message });
    }
  }
  