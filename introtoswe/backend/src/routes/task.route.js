import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUsersForSidebar, getTaskById, getTasks, createTask, deleteTask, updateTask } from "../controllers/task.controller.js";

const router = express.Router();

// router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getTaskById);
router.get("/", protectRoute, getTasks);
router.post("/", protectRoute, createTask);
router.patch("/:id", protectRoute, updateTask);
router.delete("/:id", protectRoute, deleteTask);

export default router;
