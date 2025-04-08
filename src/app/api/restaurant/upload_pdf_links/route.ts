import dbConnect from "@/lib/db";
import {  NextResponse } from "next/server";

import { Restaurant } from "@/models/Restaurant";


export async function PUT(request: Request) {
  try {
    await dbConnect();

    const {
      pdfLinks,
      restaurantId
    } = await request.json();

    
    
    
  const createPdfLinks = await Restaurant.updateOne({_id:restaurantId},{$set:{pdfLinks:pdfLinks}})
 


    return NextResponse.json({updated_restaurant:createPdfLinks});
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({ error });
  }
}
