import express from "express";
import {
  createFunding,
  deleteFundingById,
  getAllFunding,
  getFundingById,
  updateFundingById,
} from "../controllers/funding.controller.js";

const router = express.Router();

router.post("/create", createFunding);

router.get("/get-all", getAllFunding);

router.get("/get/:id", getFundingById);

router.put("/update/:id", updateFundingById);

router.delete("/delete/:id", deleteFundingById);

export default router;
