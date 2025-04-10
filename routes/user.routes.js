import express from "express";
import { userPremiumSubscription } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/premium-subscription", userPremiumSubscription);

export default router;
