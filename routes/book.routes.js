import express from "express";
import {
  addReviewToBook,
  createBook,
  getAllBooks,
  getBookById,
  getReviewsForBook,
  removeReviewFromBook,
  updateBookById,
  updateReviewForBook,
} from "../controllers/book.controller.js";

const router = express.Router();

router.post("/create", createBook);

router.get("/get-all", getAllBooks);

router.get("/get/:id", getBookById);

router.put("/update/:id", updateBookById);

router.post("/:id/review", addReviewToBook);

router.get("/:id/reviews", getReviewsForBook);

router.put("/:id/review/:reviewId", updateReviewForBook);

router.delete("/:id/review/:reviewId", removeReviewFromBook);

export default router;
