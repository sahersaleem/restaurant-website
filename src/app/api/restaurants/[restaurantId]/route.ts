import dbConnect from "@/lib/db";
import { Restaurant } from "@/models/Restaurant";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: any }) {
  try {
    await dbConnect();

    const restaurantId = await params.restaurantId;

    const findRestaurantById = await Restaurant.findById(restaurantId);

    if (!findRestaurantById) {
      return NextResponse.json({ message: "Restaurant not found" });
    }

    return NextResponse.json({ findRestaurantById });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
