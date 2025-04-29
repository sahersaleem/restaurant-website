import { NextRequest, NextResponse } from "next/server";
import { ReviewModel } from "@/models/Review";

export async function POST(request: NextRequest) {
  try {
    const { restaurantId, rating, reviews } = await request.json();

    const newReview = new ReviewModel({
      restaurantId,
      rating,
      review:reviews,
    });

    await newReview.save();

    return NextResponse.json({ message: "Review created successfully!" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Failed to create review" });
  }
}

export async function GET(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url);
      const restaurantId = searchParams.get("restaurantId");
  
      if (!restaurantId) {
        return NextResponse.json({ message: "Restaurant ID is required" }, { status: 400 });
      }
  
      const reviews = await ReviewModel.find({ restaurantId });
  
      return NextResponse.json(reviews);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Error fetching reviews" }, { status: 500 });
    }
  }