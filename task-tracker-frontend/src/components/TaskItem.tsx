import { useState } from "react";
import type { Task } from "../types/task";
import "../styles/tasks.css";

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
  onUpdate: (id: string, title: string, description?: string) => void;
}

const TaskItem = ({ task, onDelete, onComplete, onUpdate }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");

  const handleSave = () => {
    if (!title.trim()) return;
    onUpdate(task._id, title, description);
    setIsEditing(false);
  };

  return (
    <div
      className={`task-item ${task.status === "completed" ? "completed" : ""}`}
    >
      {isEditing ? (
        <>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />

          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{task.title}</h4>
          {task.description && <p>{task.description}</p>}
          <p>Status: {task.status}</p>
          <div className="task-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(task._id)}>Delete</button>
          </div>
          {task.status === "pending" && (
            <button onClick={() => onComplete(task._id)}>Mark Completed</button>
          )}
        </>
      )}
    </div>
  );
};

export default TaskItem;
