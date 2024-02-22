// pages/api/create-checkout-session.ts
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { fetchCartData } from "utils/cart";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { cartId } = req.body;

    if (!cartId) {
      return res.status(400).json({ error: "Cart ID is required" });
    }

    try {
      // Fetch cart data from Supabase
      const cart = await fetchCartData(cartId);

      // Map cart items to Stripe's line item format
      const lineItems = cart.cart_items.map((item: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.plants.name,
            images: [item.plants.images[0]?.url], // Assuming the first image is what you want to use
          },
          unit_amount: item.plants.price * 100, // Assuming price is in dollars, convert to cents
        },
        quantity: item.quantity,
      }));

      // Create a Stripe Checkout Session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cancel`,
      });

      // console.log(session, "session");
      // console.log(lineItems, "lineItems");
      // console.log(JSON.stringify(cart, null, 2), "cart");

      res.status(200).json({ sessionId: session.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create checkout session" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("Method Not Allowed");
  }
}
