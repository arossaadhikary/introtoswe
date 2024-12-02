// routes/record.js
import express from "express";
import { ObjectId } from "mongodb";
import { getDb } from "../db/connection.js";
import { authMiddleware } from "../middleware/authMiddleware.js"; // Import auth middleware

const router = express.Router();

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
router.post("/", authMiddleware, async (req, res) => {
  try {
    const db = getDb(); // Get the database instance
    const newDocument = {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
      user: req.user.username, // Use username from decoded token
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
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const db = getDb(); // Get the database instance
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
        user: req.user.username, // Use username from decoded token
      },
    };

    const collection = db.collection("records");
    const result = await collection.updateOne(query, updates);

    // Check if the record was found and updated
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Record not found" });
    }

    res
      .status(200)
      .json({ message: "Record updated successfully", result });
  } catch (error) {
    console.error("Error updating record:", error.message, error.stack);

    // Ensure only one response is sent
    if (!res.headersSent) {
      res
        .status(500)
        .json({ message: "Error updating record", error: error.message });
    }
  }
});

// Route to delete a record by id (requires authentication)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const db = getDb(); // Get the database instance
    const query = { _id: new ObjectId(req.params.id) };
    const collection = db.collection("records");
    const result = await collection.deleteOne(query);

    // Send response only once
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Record not found" });
    }

    res
      .status(200)
      .json({ message: "Record deleted successfully", result });
  } catch (error) {
    console.error("Error deleting record:", error.message, error.stack);

    // Ensure only one response is sent
    if (!res.headersSent) {
      res
        .status(500)
        .json({ message: "Error deleting record", error: error.message });
    }
  }
});

export default router;
