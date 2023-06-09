import Stripe from "stripe";

const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        shipping_address_collection: {
          allowed_countries: ["US", "CA"],
        },
        shipping_options: [
          {
            shipping_rate: "shr_1MwqKvLRbrYcxxv052z4lwXN",
          },
        ],
        allow_promotion_codes: true,
        line_items: req.body.map((item) => {
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.title,
                images: [
                  process.env.NEXT_PUBLIC_BACKEND_URL +
                    item.image.data.attributes.url,
                ],
              },
              unit_amount: item.price * 100,
            },
            quantity: item.quantity,
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      });

      res.status(200).json(session);
    } catch (error) {
      res.status(error.statusCode || 500).json(error.message);
    }
  }
}
