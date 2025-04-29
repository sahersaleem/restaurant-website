import dbConnect from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

import { Restaurant } from "@/models/Restaurant";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const restaurantId = searchParams.get("id");

    const findRestaurantById = await Restaurant.findOne({ _id: restaurantId });
    if (!findRestaurantById) {
      return NextResponse.json({ message: "Restaurant not found!" });
    }

    console.log(findRestaurantById);

    return NextResponse.json({ findRestaurantById });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({ error });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();

    const restaurantId = request.nextUrl.searchParams.get("id");
    console.log(restaurantId);
    const {
      restaurantName,
      address,
      description,
      phoneNumber,
      googlePage,
      website_link,
    } = await request.json();
    //  console.log(restaurantName , address , openingTime , closingTime , description);

    const findRestaurantByIdAndUpdate = await Restaurant.findOneAndUpdate(
      { _id: restaurantId },
      {
        restaurantName,
        address,
        phoneNumber,
        googlePage,
        website_link,
        description,
      }
    );
    if (!findRestaurantByIdAndUpdate) {
      return NextResponse.json({ message: "Restaurant not found!" });
    }

    await findRestaurantByIdAndUpdate.save();

    return NextResponse.json({ findRestaurantByIdAndUpdate });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({ error });
  }
}
