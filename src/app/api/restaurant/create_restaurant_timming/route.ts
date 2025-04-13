import dbConnect from "@/lib/db";
import { Timing } from "@/models/timing_model";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const restaurantId = request.nextUrl.searchParams.get("id");

    const { restaurantTimings } = await request.json();

    for (const timing of restaurantTimings) {
      const createRestaurantTimings = await Timing.create({
        restaurants: restaurantId,
        days: timing.days,
        slots: timing.slots,
      });

      createRestaurantTimings.save();
    }



    return NextResponse.json({ status: 200 });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({ error });
  }
}
