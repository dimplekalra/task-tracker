export type TaskStatus = "pending" | "completed";

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: string;
}
