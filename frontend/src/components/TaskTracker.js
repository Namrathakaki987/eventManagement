import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal"; 

const API_BASE_URL = "http://localhost:8080/api/v1"; 

function TaskTracker() {
  const [events, setEvents] = useState([]); 
  const [tasks, setTasks] = useState([]); 
  const [selectedEventId, setSelectedEventId] = useState(null); 
  const [isModalOpen, setModalOpen] = useState(false); 
  const [currentTask, setCurrentTask] = useState(null); 

  useEffect(() => {
    fetchEvents(); 
  }, []);

  
  const fetchEvents = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/event`);
      setEvents(data.events);
    } catch (error) {
      console.error("Error fetching events:", error.response?.data || error.message);
      alert("Failed to fetch events. Please try again.");
    }
  };

  
  const fetchTasksForEvent = async (eventId) => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/task/${eventId}`);
      setTasks(data.tasks);
      setSelectedEventId(eventId); 
    } catch (error) {
      console.error("Error fetching tasks for the event:", error.response?.data || error.message);
      alert("Failed to fetch tasks for the selected event.");
    }
  };

  
  const openModalForTask = (task = null) => {
    setCurrentTask(task);
    setModalOpen(true);
  };


  const handleSaveTask = async (taskData) => {
    try {
      if (currentTask) {
        await axios.patch(`${API_BASE_URL}/task/${currentTask._id}`, taskData);
      } else {
        await axios.post(`${API_BASE_URL}/task`, { ...taskData, eventId: selectedEventId });
      }
      fetchTasksForEvent(selectedEventId);
      setModalOpen(false); 
    } catch (error) {
      console.error("Error saving task:", error.response?.data || error.message);
      alert("Failed to save task. Please try again.");
    }
  };

  
  const updateTaskStatus = async (taskId, status) => {
    try {
      await axios.patch(`${API_BASE_URL}/task/${taskId}`, { status });
      fetchTasksForEvent(selectedEventId);
    } catch (error) {
      console.error("Error updating task status:", error.response?.data || error.message);
      alert("Failed to update task status. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Task Tracker</h2>

      
      <div className="mb-6">
        <h3 className="text-xl font-bold">Available Events</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {events.map((event) => (
            <div
              key={event._id}
              className={`p-4 border rounded cursor-pointer ${selectedEventId === event._id ? "bg-blue-100" : "bg-white"}`}
              onClick={() => fetchTasksForEvent(event._id)}
            >
              <h4 className="font-bold">{event.name}</h4>
              <p>{event.description}</p>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>

      
      {selectedEventId && (
        <div>
          <h3 className="text-xl font-bold">Tasks for Selected Event</h3>
          <button
            onClick={() => openModalForTask()}
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
          >
            Create Task
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {tasks.map((task) => (
              <div key={task._id} className="p-4 bg-white shadow rounded">
                <h4 className="font-bold">{task.name}</h4>
                <p><strong>Assigned To:</strong> {task.assignedTo ? `${task.assignedTo.name} (${task.assignedTo.email})` : "Not assigned"}</p>
                <p><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {task.status}</p>
                <div className="mt-2 flex justify-between">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => updateTaskStatus(task._id, "Completed")}
                  >
                    Mark as Completed
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                    onClick={() => updateTaskStatus(task._id, "Pending")}
                  >
                    Mark as Pending
                  </button>
                  <button
                    className="bg-purple-500 text-white px-2 py-1 rounded"
                    onClick={() => openModalForTask(task)}
                  >
                    Edit Task
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

  
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <TaskForm onSave={handleSaveTask} task={currentTask} />
      </Modal>
    </div>
  );
}


function TaskForm({ onSave, task }) {
  const [formData, setFormData] = useState({ name: "", deadline: "", assignedTo: "" });

  useEffect(() => {
    if (task) {
      setFormData({ name: task.name, deadline: task.deadline, assignedTo: task.assignedTo?._id || "" });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className="block">Task Name:</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
      </div>
      <div>
        <label className="block">Deadline:</label>
        <input
          name="deadline"
          type="date"
          value={formData.deadline}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
      </div>
      <div>
        <label className="block">Assigned To (Attendee ID):</label>
        <input
          name="assignedTo"
          value={formData.assignedTo}
          onChange={handleChange}
          className="w-full border p-2"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4">
        Save Task
      </button>
    </form>
  );
}

export default TaskTracker;


