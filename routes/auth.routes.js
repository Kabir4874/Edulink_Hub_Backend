import express from "express";
import {
  login,
  register,
  resetPassword,
} from "../controllers/auth.controller.js";
import { sendEmailOtp, verifyEmailOtp } from "../controllers/otp.controller.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/verify-otp", verifyEmailOtp);
router.post("/send-otp", sendEmailOtp);

router.post("/reset-password", resetPassword);

export default router;
