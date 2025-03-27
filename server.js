import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { dbConnect } from "./utils/db.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

app.use(express.json());

dbConnect();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
