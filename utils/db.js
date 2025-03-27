import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database Connected");
  } catch (error) {
    console.log(error.message);
  }
};
