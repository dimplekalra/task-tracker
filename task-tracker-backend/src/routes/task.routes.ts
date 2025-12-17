import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
  markTaskCompleted,
} from "../controllers/task.controller";

const router = Router();

router.use(authMiddleware);

router.post("/", createTask);
router.get("/", getAllTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.patch("/:id/complete", markTaskCompleted);

export default router;
