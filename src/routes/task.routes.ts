import { Router } from "express"
import {
  createTask,
  getTasks,
  toggleTask,
  deleteTask
} from "../controllers/task.controller"
import { authMiddleware } from "../middleware/middleware"

const router = Router()

router.post("/", authMiddleware, createTask)
router.get("/", authMiddleware, getTasks)
router.patch("/:id/toggle", authMiddleware, toggleTask)
router.delete("/:id", authMiddleware, deleteTask)

export default router