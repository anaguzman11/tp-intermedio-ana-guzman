import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/booksdb");
    console.log("MongoDB conectado 🚀");
  } catch (error) {
    console.error("Error al conectar MongoDB:", error);
    process.exit(1);
  }
};