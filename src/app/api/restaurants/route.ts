
    
import dbConnect from "@/lib/db";
import { Restaurant } from "@/models/Restaurant";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
  try {
    await dbConnect();

    const restaurant = await Restaurant.find();
     
    if (!restaurant) {
      return NextResponse.json({ message: "restaurant not found", status: "404" });
    }

    return NextResponse.json({ restaurant });
  } catch (error: any) {
    return NextResponse.json({
      message: "Error occurr while fetching data from data base",
    });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();

    const { id , status} = await request.json();

    const restaurant= await Restaurant.findByIdAndUpdate(
       id,
      { status: status }
    );

    await restaurant.save();

    return NextResponse.json({ status: 400 });
  } catch (error: any) {
    return NextResponse.json({
      message: "Error occurr while fetching data from data base",
    });
  }
}


export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    const userId = request.nextUrl.searchParams.get("id");
   
  const restaurant = await Restaurant.findByIdAndDelete(userId)

  return NextResponse.json({message:"User deleted succesffuly" , status:200})
 

    return NextResponse.json({ status: 400 });
  } catch (error: any) {
    return NextResponse.json({
      message: "Error occurr while deleting restaurant from data base",
    });
  }
}
