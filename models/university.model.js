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
    applicationDate: {
      type: Date,
    },
    applicationDeadline: {
      type: Date,
    },
    admitCardDownloadDate: {
      type: Date,
    },
    examUnits: [
      {
        unit: {
          type: String,
        },
        date: {
          type: Date,
        },
      },
    ],
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

universitySchema.index({ name: 1, location: 1 });

const University = mongoose.model("University", universitySchema);
module.exports = University;
