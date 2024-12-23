import { Attendee } from "../models/attendeeModel.js";
import { Event } from "../models/eventModel.js";

export const addAttendee = async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ message: "Name and email are required", success: false });
        }

        const newAttendee = await Attendee.create({ name, email });
        res.status(201).json({ message: "Attendee added successfully", attendee: newAttendee, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

export const getAllAttendees = async (req, res) => {
    try {
        const attendees = await Attendee.find().populate("assignedTasks");
        res.status(200).json({ attendees, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

export const deleteAttendee = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedAttendee = await Attendee.findByIdAndDelete(id);

        if (!deletedAttendee) {
            return res.status(404).json({ message: "Attendee not found", success: false });
        }

        // Optionally, remove attendee from events they were assigned to
        await Event.updateMany({ attendees: id }, { $pull: { attendees: id } });

        res.status(200).json({ message: "Attendee deleted successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

export const assignAttendeeToEvent = async (req, res) => {
    try {
        const { attendeeId, eventId } = req.body;

        const event = await Event.findById(eventId);
        const attendee = await Attendee.findById(attendeeId);

        if (!event || !attendee) {
            return res.status(404).json({ message: "Event or attendee not found", success: false });
        }

        if (event.attendees.includes(attendeeId)) {
            return res.status(400).json({ message: "Attendee already assigned to this event", success: false });
        }

        event.attendees.push(attendeeId);
        await event.save();

        res.status(200).json({ message: "Attendee assigned to event successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};
