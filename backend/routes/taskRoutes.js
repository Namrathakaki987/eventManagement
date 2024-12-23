// import express from "express";
// import { createTask, getAllTasks, getTasksForEvent,updateTaskStatus } from "../controllers/Task.js";

// const router = express.Router();

// // Create a new task
// router.post("/", createTask);
// router.get("/",getAllTasks)
// // Get tasks for an event
// router.get("/:eventId", getTasksForEvent);
// router.patch("/:id", updateTaskStatus);
// export default router;

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
router.route("/event/:eventId").get(getTasksForEvent);

// Route for updating a task's status
router.route("/:id").patch(updateTaskStatus);

export default router;


