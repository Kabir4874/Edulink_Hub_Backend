import { Schema, model } from "mongoose";

const paymentSchema = new Schema(
  {
    orderId: { type: String, required: true },
    payerEmail: { type: String, required: true },
    payerName: { type: String, required: true },
    amount: { type: String, required: true },
    currency: { type: String, required: true },
    status: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Payment = model("Payment", paymentSchema);
export default Payment;
