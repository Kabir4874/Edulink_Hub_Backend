import express from "express";
import {
  checkIfBookPurchased,
  deleteUserById,
  getAllUsers,
  getUserById,
  purchaseBook,
  updateUserById,
  updateUserPremiumStatus,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/get-all", getAllUsers);

router.get("/get/:id", getUserById);

router.put("/update/:id", updateUserById);

router.put("/update-premium/:id", updateUserPremiumStatus);

router.delete("/delete/:id", deleteUserById);

router.post("/:userId/books/:bookId/purchase", purchaseBook);

router.get("/:userId/books/:bookId/check", checkIfBookPurchased);

export default router;
