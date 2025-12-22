import React, { useState } from "react";

const AddTasks = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Pending");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim().length < 5) {
      setError("Title must be at least 5 characters");
      return;
    }

    const newTask = {
      title,
      description,
      priority,
      status,
    };

    onAdd(newTask);

    setTitle("");
    setDescription("");
    setPriority("Medium");
    setStatus("Pending");
    setError("");
  };

  return (
    <div style={{
      maxWidth: "420px",
      margin: "30px auto",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      backgroundColor: "#fff"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: "15px" }}>Add New Task</h2>

      {error && <p style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "14px"
          }}
        />

        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "14px",
            height: "80px"
          }}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "14px"
          }}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "14px"
          }}
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <button type="submit" style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "15px"
        }}>
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTasks;
