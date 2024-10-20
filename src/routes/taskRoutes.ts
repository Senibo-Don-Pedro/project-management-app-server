import { Router } from "express";
import taskController from "../controllers/taskController";

const router = Router();

router.get("/", taskController.getTasks);
router.post("/", taskController.createTask);
router.patch("/:taskId/status", taskController.updateTaskStatus);

export default router;
