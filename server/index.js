const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json());

// ROUTES //

// Create a todo
app.post("/task", async (req, res) => {
  try {
    const { description } = req.body;
    const newTask = await pool.query(
      "INSERT INTO task (description) VALUES($1)", 
      [description]
    );

    res.json(newTask.rows[0]);
  } catch (err) {
    console.error("Cannot create a task", err.message);
  }
});

// Get all todos
app.get("/task", async (req, res) => {
  try {
    const tasks = await pool.query("SELECT*FROM task ORDER BY todo_id ASC");
    res.json(tasks.rows);
  } catch (err) {
    console.error("Cannot get tasks", err.message);
  }
});

// Get a todo
app.get("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await pool.query("SELECT*FROM task WHERE todo_id = $1", [id]);
    res.json(task.rows);
  } catch (err) {
    console.error("Cannot get a task", err.message);
  }
});

// Update a todo
app.put("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTask = await pool.query(
      "UPDATE task SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json(updateTask.rows);
  } catch (err) {
    console.error("Cannot update a task", err.message);
  }
});


// Delete a todo
app.delete("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTask = await pool.query("DELETE FROM task WHERE todo_id = $1", [id]);
    res.json("Task was deleted");
  } catch (err) {
    console.error("Cannot delete task", err.message);
  }
});


  app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
