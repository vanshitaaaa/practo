require("dotenv").config();
const express = require("express");
const Stripe = require("stripe");
const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  const { name, email, phone, doctorId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      success_url: `http://localhost:3000/appointment-confirmed`,
      cancel_url: `http://localhost:3000/booking-details/${doctorId}`,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: `Doctor Appointment with ID ${doctorId}` },
            unit_amount: 5000, // $50 in cents
          },
          quantity: 1,
        },
      ],
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating Stripe session");
  }
});

module.exports = router;
