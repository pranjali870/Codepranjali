import React, { useState } from "react";
import AddTasks from "./AddTasks";


const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <div>
      <AddTasks onAdd={handleAddTask} />

      <div className="card">
        <h3>Task List</h3>

        {tasks.length === 0 ? (
          <p>No tasks added</p>
        ) : (
          <ul>
            {tasks.map((t, i) => (
              <li key={i}>
                <b>{t.title}</b> ({t.priority}) – {t.status}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Tasks;
