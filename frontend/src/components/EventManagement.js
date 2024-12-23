import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal.js";

function EventManagement() {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/event");
      setEvents(data.events);
    } catch (error) {
      console.error("Error fetching events", error);
    }
  };

  const handleSaveEvent = async (event) => {
    if (currentEvent) {
      await axios.put(`http://localhost:8080/api/v1/event/${currentEvent._id}`, event);
    } else {
      await axios.post("http://localhost:8080/api/v1/event", event);
    }
    fetchEvents();
    setModalOpen(false);
  };

  const handleDeleteEvent = async (id) => {
    await axios.delete(`http://localhost:8080/api/v1/event/${id}`);
    fetchEvents();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Event Management</h2>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => {
          setCurrentEvent(null);
          setModalOpen(true);
        }}
      >
        Add Event
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <div key={event._id} className="p-4 bg-white shadow rounded">
            <h3 className="font-bold text-lg">{event.name}</h3>
            <p>{event.description}</p>
            <p>{event.location}</p>
            <p>{new Date(event.date).toLocaleDateString()}</p>
            <div className="mt-2 flex justify-between">
              <button
                className="bg-yellow-500 text-white px-2 py-1 rounded"
                onClick={() => {
                  setCurrentEvent(event);
                  setModalOpen(true);
                }}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => handleDeleteEvent(event._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <EventForm onSave={handleSaveEvent} event={currentEvent} />
      </Modal>
    </div>
  );
}

function EventForm({ onSave, event }) {
  const [formData, setFormData] = useState(
    event || { name: "", description: "", location: "", date: "" }
  );

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
        <label className="block">Name:</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
      </div>
      <div>
        <label className="block">Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2"
        />
      </div>
      <div>
        <label className="block">Location:</label>
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
      </div>
      <div>
        <label className="block">Date:</label>
        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4">
        Save
      </button>
    </form>
  );
}

export default EventManagement;
