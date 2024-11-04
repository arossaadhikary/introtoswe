import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db/connection.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Register a new user
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const userCollection = db.collection("users");

    // Check if user already exists
    const existingUser = await userCollection.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const result = await userCollection.insertOne({ username, password: hashedPassword });
    res.status(201).json({ message: "User created", userId: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
});

// Login a user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const userCollection = db.collection("users");
    const user = await userCollection.findOne({ username });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token, username: user.username });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

export default router;
