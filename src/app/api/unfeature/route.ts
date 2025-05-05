// /app/api/unfeature/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Restaurant } from "@/models/Restaurant";

export async function GET() {
  await dbConnect();

  const today = new Date();

  await Restaurant.updateMany(
    {
      isFeatured: true,
      featuredTill: { $lt: today },
    },
    {
      $set: { isFeatured: false },
    }
  );

  return NextResponse.json({ message: "Updated successfully!" });
}
