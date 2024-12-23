import { Event } from "../models/eventModel.js";

export const createEvent = async (req, res) => {
    try {
        const { name, description, location, date } = req.body;

        if (!name || !location || !date) {
            return res.status(400).json({ message: "Missing required fields", success: false });
        }

        const newEvent = await Event.create({ name, description, location, date });
        res.status(201).json({ message: "Event created successfully", event: newEvent, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().populate("attendees");
        res.status(200).json({ events, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

export const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, location, date } = req.body;

        const updatedEvent = await Event.findByIdAndUpdate(
            id,
            { name, description, location, date },
            { new: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found", success: false });
        }

        res.status(200).json({ message: "Event updated successfully", event: updatedEvent, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedEvent = await Event.findByIdAndDelete(id);

        if (!deletedEvent) {
            return res.status(404).json({ message: "Event not found", success: false });
        }

        res.status(200).json({ message: "Event deleted successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};
