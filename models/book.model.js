import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Admission", "Job Exam", "Skill-Based"],
      required: true,
    },
    description: String,
    pdfLink: {
      type: String,
      required: true,
    },
    uploadDate: {
      type: Date,
      default: Date.now,
    },
    suggestedFor: [String],
    isPaid: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      required: function () {
        return this.isPaid;
      },
      min: 0,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;
