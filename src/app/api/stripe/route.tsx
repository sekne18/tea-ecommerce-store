import { Stripe } from "stripe";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: "2020-08-27",
});

export async function POST(
  req: Request,
  res: NextApiResponse<Stripe.Response<Stripe.Checkout.Session>>
) {
  if (req.method === "POST") {
    try {
      const data: ProductType[] = await req.json();
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          { shipping_rate: "shr_1Ns0wuAfhygDcCp533H1pT5d" },
          { shipping_rate: "shr_1Ns0xSAfhygDcCp5FQ43u0Qq" },
        ],
        line_items: data.map((item: ProductType) => {
          const newImage = item.image[0].asset._ref
            .replace(
              "image-",
              "https://cdn.sanity.io/images/f0vx3oht/production/"
            )
            .replace("-webp", ".webp");
          return {
            price_data: {
              currency: "eur",
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.get("origin")}/success`,
        cancel_url: `${req.headers.get("origin")}/canceled`,
      };
      console.log(params);
      const session = await stripe.checkout.sessions.create(params);
      return NextResponse.json(session);
    } catch (err: any) {
      return NextResponse.json(err.message);
    }
  } else {
    // res.setHeader("Allow", "POST");
    // res.status(405).end("Method Not Allowed");
  }
}
