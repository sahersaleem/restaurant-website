import dbConnect from "@/lib/db";
import { Timing } from "@/models/timing_model";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const restaurantId = request.nextUrl.searchParams.get("id");

    const { timings } = await request.json();
   console.log(timings)
    for (const timing of timings) {
      const createRestaurantTimings = await Timing.create({
        restaurant: restaurantId,
        days: timing.day,
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



export async function GET(request:NextRequest){
  try {
    await dbConnect()
    const restaurantId = request.nextUrl.searchParams.get("id");
    const restaurantTimingsFindById = await Timing.find({restaurant:restaurantId})
    
    if(!restaurantTimingsFindById){
      return NextResponse.json({message:"No timing present of this restaurant"})
    }
     
    return NextResponse.json({restaurantTimingsFindById})


  } catch (error:any) {

    return NextResponse.json({message:error.message})
  }
}