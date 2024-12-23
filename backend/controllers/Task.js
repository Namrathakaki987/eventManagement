import { Task } from "../models/taskModel.js";
import { Event } from "../models/eventModel.js";

export const createTask = async (req, res) => {
  try {
    const { name, deadline, status, assignedTo, eventId } = req.body;

    
    if (!name || !deadline || !eventId) {
      return res.status(400).json({
        success: false,
        message: "Task name, deadline, and eventId are required.",
      });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    
    const task = await Task.create({
      name,
      deadline,
      status,
      assignedTo,
      eventId,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully.",
      task,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create task.",
    });
  }
};


export const getTasksForEvent = async (req, res) => {
  try {
    const tasks = await Task.find({ eventId: req.params.eventId })
      .populate('assignedTo', 'name email') 
      .exec();
    res.json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Failed to fetch tasks." });
  }
};

  



export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params; 
    const { status } = req.body; 

    
    if (!status || !['Pending', 'Completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Allowed values are 'Pending' or 'Completed'.",
      });
    }

    
    const task = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task status updated successfully.",
      task,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update task status.",
    });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedTo").populate("eventId");
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch tasks." });
  }
};


