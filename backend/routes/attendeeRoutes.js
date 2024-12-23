import express from "express";
import { addAttendee, getAllAttendees, deleteAttendee, assignAttendeeToEvent } from "../controllers/Attendee.js";

const router = express.Router();

router.route("/").post(addAttendee).get(getAllAttendees);
router.route("/:id").delete(deleteAttendee);
router.route("/assign").post(assignAttendeeToEvent);

export default router;
