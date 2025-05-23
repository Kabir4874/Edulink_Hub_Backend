import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import bookRoutes from "./routes/book.routes.js";
import fundingRoutes from "./routes/funding.routes.js";
import professorRoutes from "./routes/professor.routes.js";
import universityRoutes from "./routes/university.routes.js";
import userRoutes from "./routes/user.routes.js";
import { dbConnect } from "./utils/db.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

dbConnect();

app.get("/", (req, res) => {
  res.send("Welcome to EduLink Hub API!");
});
app.use("/auth", authRoutes);
app.use("/university", universityRoutes);
app.use("/book", bookRoutes);
app.use("/professor", professorRoutes);
app.use("/user", userRoutes);
app.use("/funding", fundingRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
