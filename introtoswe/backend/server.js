import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import auth from "./routes/auth.js"; // New import for auth routes

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records);
app.use("/auth", auth); // Add authentication route

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
