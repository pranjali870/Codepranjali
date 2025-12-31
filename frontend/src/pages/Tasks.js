import React, { useState, useEffect } from "react";
import AddTasks from "../components/AddTasks";
import axios from "axios";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const token = localStorage.getItem("token");

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/tasks`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTasks(res.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
    fetchTasks();
  }, [token]);

  // Add task
  const handleAddTask = async (task) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/tasks`, task, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks([...tasks, res.data]);
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  // Edit task
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditTitle(tasks[index].title);
  };

  const handleSave = async (index) => {
    try {
      const task = tasks[index];
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/tasks/${task._id}`, { title: editTitle }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const updatedTasks = [...tasks];
      updatedTasks[index] = res.data;
      setTasks(updatedTasks);
      setEditIndex(null);
      setEditTitle("");
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  return (
    <div>
      <AddTasks onAdd={handleAddTask} />
      <div style={{ maxWidth: "600px", margin: "20px auto" }}>
        <h3>Task List</h3>
        {tasks.length === 0 ? <p>No tasks added</p> : (
          <ul>
            {tasks.map((t, i) => (
              <li key={t._id} style={{ marginBottom: "10px" }}>
                {editIndex === i ? (
                  <>
                    <input value={editTitle} onChange={e => setEditTitle(e.target.value)} />
                    <button onClick={() => handleSave(i)}>Save</button>
                  </>
                ) : (
                  <>
                    <b>{t.title}</b> ({t.priority}) – {t.status}
                    <button onClick={() => handleEdit(i)} style={{ marginLeft: "10px" }}>Edit</button>
                  </>
                )}
                <button onClick={() => handleDelete(t._id)} style={{ marginLeft: "5px" }}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Tasks;
