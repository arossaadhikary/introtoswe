import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import records from "./routes/record.js";
import auth from "./routes/auth.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());
app.use("/record", records);
app.use("/auth", auth);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
