import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { Payment } from "@/models/paymentSchema";
import { Restaurant } from "@/models/Restaurant";

export async function POST(request: NextRequest) {
  const res = await request.text();
  const signatures = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      res,
      signatures,
      process.env.WEBHOOK_ENDPOINT!
    );
  } catch (error: any) {
    return NextResponse.json({ message: "Error occurred" });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  const restaurantId = session.metadata?.restaurantId;
  const paymentIntendId = session.payment_intent?.toString();
  const amount = session.amount_total! / 100;
  if (event.type === "checkout.session.completed") {
    if (!restaurantId) {
      return new NextResponse(`Webhook error Missing metadata`, {
        status: 400,
      });
    }

    await dbConnect();
    const featuredRestaurant = await Payment.create({
      restaurantId,
      stripeSessionId: paymentIntendId,
      amount: amount,
      status: "paid",
      currency:"usd"
    });

    await featuredRestaurant.save();

    const updateRestaurant = await Restaurant.findByIdAndUpdate(restaurantId, {
      isFeatured: true,
    });

    return NextResponse.json({ message: "recieved" });
  } else {
    return new NextResponse(`unhandled event error, ${event.type}`, {
      status: 200,
    });
  }

  return NextResponse.json(null, { status: 200 });
}
