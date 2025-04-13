import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";

import { Restaurant } from "@/models/Restaurant";

export async function PUT(request: Request) {
  try {
    await dbConnect();

    const { pdfLinks, logoLink, restaurantId } = await request.json();

    console.log(logoLink , "Upload link");

    const createPdfLinks = await Restaurant.updateOne(
      { _id: restaurantId },
      { $set: { pdfLinks: pdfLinks } }
    );

    if (logoLink) {
      const createlogoLinks = await Restaurant.updateOne(
        { _id: restaurantId },
        { $set: { logo: logoLink } }
      );
      console.log(createlogoLinks)
      return NextResponse.json({ updated_restaurant: createlogoLinks });
    }

    return NextResponse.json({ updated_restaurant: createPdfLinks });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({ error });
  }
}
