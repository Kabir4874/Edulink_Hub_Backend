import dotenv from "dotenv";
import Stripe from "stripe";
import Payment from "../models/payment.model.js";
import User from "../models/user.model.js";
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const userPremiumSubscription = async (req, res) => {
  const { paymentMethodId, amount } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error(`User not found for ID: ${userId}`);
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: { enabled: true, allow_redirects: "never" },
    });

    const newPayment = new Payment({
      orderId: paymentIntent.id,
      payerEmail: user.email,
      payerName: user.name,
      amount: amount.toString(),
      currency: "USD",
      status: paymentIntent.status,
      userId,
    });
    await newPayment.save();

    const premiumExpiryDate = new Date();
    premiumExpiryDate.setMonth(premiumExpiryDate.getMonth() + 1);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        isPremium: true,
        premiumExpiresAt: premiumExpiryDate,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Payment successful and Premium activated",
      paymentIntent,
      user: updatedUser,
      success: true,
    });
  } catch (error) {
    console.error("Payment failed:", error);
    res.status(500).json({
      success: false,
      message: "Payment failed",
      error: error.message,
    });
  }
};
