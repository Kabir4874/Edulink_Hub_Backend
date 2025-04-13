import express from "express";
import {
  createProfessor,
  deleteProfessorById,
  getAllProfessors,
  getProfessorById,
  updateProfessorById,
} from "../controllers/professor.controller.js";

const router = express.Router();

router.post("/create", createProfessor);

router.get("/get-all", getAllProfessors);

router.get("/get/:id", getProfessorById);

router.put("/update/:id", updateProfessorById);

router.delete("/delete/:id", deleteProfessorById);

export default router;
