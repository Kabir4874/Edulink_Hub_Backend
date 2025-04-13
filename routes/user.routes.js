import express from "express";
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
  updateUserPremiumStatus,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/get-all", getAllUsers);

router.get("/get/:id", getUserById);

router.put("/update/:id", updateUserById);

router.put("/update-premium/:id", updateUserPremiumStatus);

router.delete("/delete/:id", deleteUserById);

export default router;
