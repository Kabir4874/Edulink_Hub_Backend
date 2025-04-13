import express from "express";
import {
  createUniversity,
  deleteUniversity,
  getAllUniversities,
  getUniversityById,
  updateUniversity,
} from "../controllers/university.controller.js";

const router = express.Router();

router.post("/create", createUniversity);

router.get("/get/:id", getUniversityById);

router.get("/get-all", getAllUniversities);

router.put("/update/:id", updateUniversity);

router.delete("/delete/:id", deleteUniversity);

export default router;
