import dbConnect from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

import { Restaurant } from "@/models/Restaurant";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const restaurantId = request.nextUrl.searchParams.get("id");
    // console.log(restaurantId);
    
    
    

    const findRestaurantById = await Restaurant.findOne({ _id: restaurantId });
    if (!findRestaurantById) {
      return NextResponse.json({ message: "Restaurant not found!" });
    }

    return NextResponse.json({ findRestaurantById });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({ error });
  }
}
