import mongoose from "mongoose";

const fundingSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["scholarship", "grant", "professor"],
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
    applicationDeadline: {
      type: Date,
    },
    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
    },
    professor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Professor",
    },
  },
  { timestamps: true }
);

const Funding = mongoose.model("Funding", fundingSchema);
module.exports = Funding;
