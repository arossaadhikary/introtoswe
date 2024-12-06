import User from "../models/user.model.js";
import Task from "../models/task.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error retrieving tasks:", error.message, error.stack);
    
    res.status(500).json({ message: error.message });
  }
};

// Get a task by ID
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(task);
  } catch (error) {
    console.error("Error retrieving tasks by id", error.message, error.stack);
    
    res.status(500).json({ message: error.message });
  }
};

// Create a new task
export const createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error create tasks:", error.message, error.stack);
    
    res.status(400).json({ message: error.message });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating tasks:", error.message, error.stack);
    
    res.status(400).json({ message: error.message });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    console.error("Error deleting tasks:", error.message, error.stack);
    
    res.status(500).json({ message: error.message });
  }
};
