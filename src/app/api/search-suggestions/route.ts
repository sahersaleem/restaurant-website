import { Restaurant } from "@/models/Restaurant";
import dbConnect from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export default async function GET(
  request:NextRequest
) {
  try {
    await dbConnect();
    // const { query } = request.query;

    

    // const suggestions = await Restaurant.find({
    //   $or: [
    //     { restaurantName: { $regex: query, $options: "i" } },
    //     { cuisineType: { $regex: query, $options: "i" } },
    //     { address: { $regex: query, $options: "i" } },
    //   ],
    // }).limit(5);

    return NextResponse.json({message :"Api processing.."})
  } catch (error) {
    
    return NextResponse.json({message :"Api processing.."})
  }
}
