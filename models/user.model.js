import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: { type: String },
    address: { type: String },
    phoneNumber: { type: String },
    emailVerified: { type: Boolean, default: false },
    emailVerificationCode: { type: Number },
    paymentToken: {
      type: String,
      default: null,
    },
    queries: [
      {
        question: String,
        answer: String,
        status: {
          type: String,
          enum: ["pending", "resolved"],
          default: "pending",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
