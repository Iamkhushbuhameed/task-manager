"use client";

import { useEffect, useState } from "react";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>My Tasks</h1>

      {tasks.map((task) => (
        <div key={task.id}>
          <p>
            {task.title} — {task.completed ? "✅" : "❌"}
          </p>
        </div>
      ))}
    </div>
  );
}
