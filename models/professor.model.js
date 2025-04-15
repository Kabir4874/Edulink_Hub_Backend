import mongoose from "mongoose";

const professorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    researchInterests: {
      type: [String],
      required: true,
    },
    contactInfo: {
      email: {
        type: String,
        required: true,
      },
      phone: String,
    },
    availability: {
      type: String,
      enum: ["available", "not available"],
      default: "available",
    },
    profileLink: {
      type: String,
    },
  },
  { timestamps: true }
);

const Professor = mongoose.model("Professor", professorSchema);
export default Professor;
