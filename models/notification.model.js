import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    targetAudience: {
      type: String,
      enum: ["all", "undergraduate", "postgraduate", "Ph.D."],
      default: "all",
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
