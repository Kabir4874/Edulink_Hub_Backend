import mongoose from "mongoose";

const universitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    programType: {
      type: String,
      enum: ["undergraduate", "postgraduate", "Ph.D."],
      required: true,
    },
    discipline: {
      type: String,
      required: true,
    },
    admissionLink: {
      type: String,
      required: true,
    },
    applicationDeadline: {
      type: Date,
    },
  },
  { timestamps: true }
);

const University = mongoose.model("University", universitySchema);
module.exports = University;
