import Stripe from "stripe";

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { data } = await request.json();

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Feature restaurant",
            },
            unit_amount: data.amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/payment-success`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/payment-cancelled`,
      metadata:{
        restaurantId:data.id
      }
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    return NextResponse.json({
      message: "Error occur while ccreating stripe session",
    });
  }
}
