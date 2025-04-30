import dbConnect from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Restaurant } from "@/models/Restaurant";

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();

    const { pdfLinks, logoLink, restaurantId, thumbnail } = await request.json();

    if (!restaurantId) {
      return NextResponse.json({ message: "restaurantId is required" }, { status: 400 });
    }

    console.log(pdfLinks, logoLink, restaurantId, thumbnail);
    
    const updateData: any = {};

    if (pdfLinks) updateData.pdfLinks = pdfLinks;
    if (thumbnail) updateData.thumbnail = thumbnail;
    if (logoLink) updateData.logo = logoLink;

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
       restaurantId,
      { $set: updateData }
    );



    return NextResponse.json({ updated_restaurant: updatedRestaurant });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message || "Something went wrong" }, { status: 500 });
  }
}
