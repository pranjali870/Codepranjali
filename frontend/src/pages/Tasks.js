import React, { useState, useEffect } from "react";
import AddTasks from "../components/AddTasks";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // Add task
  const handleAddTask = (task) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  // Delete task
  const handleDelete = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  // Start edit
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditTitle(tasks[index].title);
  };

  // Save edit
  const handleSave = (index) => {
    const newTasks = [...tasks];
    newTasks[index].title = editTitle;
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setEditIndex(null);
    setEditTitle("");
  };

  return (
    <div>
      <AddTasks onAdd={handleAddTask} />

      <div style={{ maxWidth: "600px", margin: "20px auto" }}>
        <h3>Task List</h3>

        {tasks.length === 0 ? (
          <p>No tasks added</p>
        ) : (
          <ul>
            {tasks.map((t, i) => (
              <li key={i} style={{ marginBottom: "10px" }}>
                {editIndex === i ? (
                  <>
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <button onClick={() => handleSave(i)}>Save</button>
                  </>
                ) : (
                  <>
                    <b>{t.title}</b> ({t.priority}) – {t.status}
                    <button
                      onClick={() => handleEdit(i)}
                      style={{ marginLeft: "10px" }}
                    >
                      Edit
                    </button>
                  </>
                )}

                <button
                  onClick={() => handleDelete(i)}
                  style={{ marginLeft: "5px" }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Tasks;
