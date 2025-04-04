import mongoose from "mongoose";

const professorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
      required: true,
    },
    department: {
      type: String,
      required: true,
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
    fundingOpportunities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Funding",
      },
    ],
    profileLink: {
      type: String,
    },
  },
  { timestamps: true }
);

const Professor = mongoose.model("Professor", professorSchema);
export default Professor;
