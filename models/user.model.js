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
    isPremium: {
      type: Boolean,
      default: false,
    },
    premiumExpiresAt: {
      type: Date,
    },
    purchasedBooks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
