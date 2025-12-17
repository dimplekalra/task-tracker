import type { Task } from "../types/task";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
  onUpdate: (id: string, title: string, description?: string) => void;
}

const TaskList = ({ tasks, onDelete, onComplete, onUpdate }: TaskListProps) => {
  if (tasks.length === 0) {
    return <p>No tasks found</p>;
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onDelete={onDelete}
          onComplete={onComplete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default TaskList;
