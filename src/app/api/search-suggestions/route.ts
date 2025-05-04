import { Restaurant } from "@/models/Restaurant";
import dbConnect from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const query =
      request.nextUrl.searchParams.get("query")?.toLowerCase() || "";
    console.log(query);

    const restaurants = await Restaurant.find();
    console.log(restaurants);

    const suggestions: string[] = [];

    restaurants.forEach((r) => {
      if (r.restaurantName?.toLowerCase().includes(query)) {
        suggestions.push(r.restaurantName);

        return NextResponse.json({ message: "Api processing..", suggestions });
      }
      if (r.cuisineType?.toLowerCase().includes(query)) {
        suggestions.push(r.cuisineType);

        return NextResponse.json({ message: "Api processing..", suggestions });
      }
      if (r.address?.toLowerCase().includes(query)) {
        suggestions.push(r.address);

        return NextResponse.json({ message: "Api processing..", suggestions });
      }
    });

    return NextResponse.json({ message: "Api processing..", suggestions });
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}
