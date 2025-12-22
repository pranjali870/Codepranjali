const Task = require('../models/Task');

// Create Task
const createTask = async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    const existing = await Task.findOne({ title, userId: req.user._id, isDeleted: false });
    if (existing) return res.status(400).json({ message: "Task title already exists" });

    let status = priority === "High" ? "In Progress" : "Pending";
    const task = new Task({ title, description, priority, status, userId: req.user._id });
    await task.save();

    res.status(201).json({ message: "Task created successfully", task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const { status, search } = req.query;
    let filter = { userId: req.user._id, isDeleted: false };
    if (status) filter.status = status;
    if (search) filter.title = { $regex: search, $options: "i" };

    const tasks = await Task.find(filter).sort({ priority: -1, createdAt: -1 });
    res.json({ tasks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get task by ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user._id, isDeleted: false });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update task
const updateTask = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;
    const task = await Task.findOne({ _id: req.params.id, userId: req.user._id, isDeleted: false });
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.status === "Completed" && status === "Pending")
      return res.status(400).json({ message: "Cannot change Completed task to Pending" });

    if (title) task.title = title;
    if (description) task.description = description;
    if (priority) task.priority = priority;
    if (status) task.status = status;

    await task.save();
    res.json({ message: "Task updated successfully", task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Soft delete task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user._id, isDeleted: false });
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.isDeleted = true;
    await task.save();
    res.json({ message: "Task deleted successfully", task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
