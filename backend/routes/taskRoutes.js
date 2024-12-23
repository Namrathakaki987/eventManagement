

import express from "express";
import {
  createTask,
  getAllTasks,
  getTasksForEvent,
  updateTaskStatus,
} from "../controllers/Task.js";

const router = express.Router();


router.route("/").post(createTask).get(getAllTasks);

router.route("/:eventId").get(getTasksForEvent);

router.route("/:id").patch(updateTaskStatus);

export default router;





