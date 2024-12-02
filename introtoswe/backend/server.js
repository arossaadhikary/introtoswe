// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import records from "./routes/record.js";
import auth from "./routes/auth.js";
import { authMiddleware } from "./middleware/authMiddleware.js"; // Import auth middleware if needed elsewhere

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5050;

// Configure CORS
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Define Routes
app.use("/record", records);
app.use("/auth", auth);

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
