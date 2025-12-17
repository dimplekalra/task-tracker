import { useEffect, useState } from "react";
import api from "../api/axios";
import type { Task } from "../types/task";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import TaskFilter from "../components/TaskFilter";
import { logout } from "../utils/auth";

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const fetchTasks = async (status?: string) => {
    try {
      setLoading(true);

      const query = status && status !== "all" ? `?status=${status}` : "";

      const response = await api.get(`/tasks${query}`);
      setTasks(response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(filter);
  }, [filter]);

  const createTask = async (title: string, description?: string) => {
    const response = await api.post("/tasks", {
      title,
      description,
    });
    setTasks((prev) => [response.data, ...prev]);
  };

  const deleteTask = async (id: string) => {
    await api.delete(`/tasks/${id}`);
    setTasks((prev) => prev.filter((task) => task._id !== id));
  };

  const completeTask = async (id: string) => {
    const response = await api.patch(`/tasks/${id}/complete`);
    setTasks((prev) =>
      prev.map((task) => (task._id === id ? response.data : task))
    );
  };

  const updateTask = async (
    id: string,
    title: string,
    description?: string
  ) => {
    const response = await api.put(`/tasks/${id}`, {
      title,
      description,
    });

    setTasks((prev) =>
      prev.map((task) => (task._id === id ? response.data : task))
    );
  };

  return (
    <div className="container">
      <div className="dashboard-header">
        <h2>Task Dashboard</h2>
        <button onClick={logout}>Logout</button>
      </div>

      <TaskForm onCreate={createTask} />

      <TaskFilter filter={filter} onChange={setFilter} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <TaskList
          tasks={tasks}
          onDelete={deleteTask}
          onComplete={completeTask}
          onUpdate={updateTask}
        />
      )}
    </div>
  );
};

export default Dashboard;
