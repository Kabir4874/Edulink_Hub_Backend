import express from "express";
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBookById,
} from "../controllers/book.controller.js";

const router = express.Router();

router.post("/create", createBook);

router.get("/get-all", getAllBooks);

router.get("/get/:id", getBookById);

router.put("/update/:id", updateBookById);

export default router;
