import express from "express";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import { getDb } from "../db/connection.js"; // Correctly import getDb

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Helper function to verify token
function verifyToken(req, res) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    return jwt.verify(token, JWT_SECRET); // Return decoded token if valid
  } catch {
    return res.status(403).json({ message: "Invalid token" });
  }
}

// Route to get all records (no authentication needed)
router.get("/", async (req, res) => {
  try {
    const db = getDb(); // Retrieve the database instance
    const collection = db.collection("records");
    const results = await collection.find({}).toArray();
    res.status(200).json(results);
  } catch (error) {
    console.error("Error retrieving records:", error.message, error.stack);
    res.status(500).send("Error retrieving records");
  }
});

// Route to get a single record by id (no authentication needed)
router.get("/:id", async (req, res) => {
  try {
    const db = getDb();
    const collection = db.collection("records");
    const query = { _id: new ObjectId(req.params.id) };
    const result = await collection.findOne(query);
    result
      ? res.status(200).json(result)
      : res.status(404).send("Record not found");
  } catch (error) {
    console.error("Error retrieving record:", error.message, error.stack);
    res.status(500).send("Error retrieving record");
  }
});

// Route to create a new record (requires authentication)
router.post("/", async (req, res) => {
  const decoded = verifyToken(req, res);
  if (!decoded) return;

  try {
    const db = getDb(); // Get the database instance
    const newDocument = {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
      user: decoded.username, // Use username from decoded token
    };
    const collection = db.collection("records");
    const result = await collection.insertOne(newDocument);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error adding record:", error.message, error.stack);
    res.status(500).send("Error adding record");
  }
});

// Route to update a record by id (requires authentication)
router.patch("/:id", async (req, res) => {
  try {
    const decoded = verifyToken(req, res);
    if (!decoded) {
      return; // Stop execution if the user is unauthorized
    }

    const db = getDb(); // Get the database instance
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
        user: decoded.username, // Use username from decoded token
      },
    };

    const collection = db.collection("records");
    const result = await collection.updateOne(query, updates);

    // Check if the record was found and updated
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.status(200).json({ message: "Record updated successfully", result });
  } catch (error) {
    console.error("Error updating record:", error.message, error.stack);

    // Ensure only one response is sent
    if (!res.headersSent) {
      res.status(500).json({ message: "Error updating record", error: error.message });
    }
  }
});

// Route to delete a record by id (requires authentication)
router.delete("/:id", async (req, res) => {
  try {
    const decoded = verifyToken(req, res);
    if (!decoded) {
      return; // Stop execution if the user is unauthorized
    }

    const db = getDb(); // Get the database instance
    const query = { _id: new ObjectId(req.params.id) };
    const collection = db.collection("records");
    const result = await collection.deleteOne(query);

    // Send response only once
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.status(200).json({ message: "Record deleted successfully", result });
  } catch (error) {
    console.error("Error deleting record:", error.message, error.stack);

    // Ensure only one response is sent
    if (!res.headersSent) {
      res.status(500).json({ message: "Error deleting record", error: error.message });
    }
  }
});

export default router;
