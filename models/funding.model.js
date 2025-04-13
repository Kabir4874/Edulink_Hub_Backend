import mongoose from "mongoose";

const fundingSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["scholarship", "professor"],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    eligibilityCriteria: String,
    applyDate: {
      type: Date,
    },
    applicationDeadline: {
      type: Date,
    },
    university: {
      type: String,
    },
    department: {
      type: String,
    },
    professor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Professor",
    },
  },
  { timestamps: true }
);

const Funding = mongoose.model("Funding", fundingSchema);
export default Funding;
