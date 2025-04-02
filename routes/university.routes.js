import express from "express";
import {
  createUniversity,
  deleteUniversity,
  getAllUniversities,
  getUniversityById,
  searchUniversities,
  updateUniversity,
} from "../controllers/university.controller.js";

const router = express.Router();

router.post("/create-university", createUniversity);

router.get("/get-university/:id", getUniversityById);

router.get("/get-all-universities", getAllUniversities);

router.put("/update-university/:id", updateUniversity);

router.delete("/delete-university/:id", deleteUniversity);

router.get("/search-universities/search", searchUniversities);

export default router;
