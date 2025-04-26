import dbConnect from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

import { Restaurant } from "@/models/Restaurant";

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();

    const { pdfLinks, logoLink, restaurantId } = await request.json();


    const createPdfLinks = await Restaurant.updateOne(
      { _id: restaurantId },
      { $set: { pdfLinks: pdfLinks } }
    );

  

    if (logoLink) {
      const createlogoLinks = await Restaurant.updateOne(
        { _id: restaurantId },
        { $set: { logo: logoLink } }
      );
    
      return NextResponse.json({ updated_restaurant: createlogoLinks });
    }

    return NextResponse.json({ updated_restaurant: createPdfLinks });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({ error });
  }
}
