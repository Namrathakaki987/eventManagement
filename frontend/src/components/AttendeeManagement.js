import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal.js";

function AttendeeManagement() {
  const [attendees, setAttendees] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentAttendee, setCurrentAttendee] = useState(null);

  useEffect(() => {
    fetchAttendees();
  }, []);

  const fetchAttendees = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/attendee");
      setAttendees(data.attendees);
    } catch (error) {
      console.error("Error fetching attendees", error);
    }
  };

  const handleSaveAttendee = async (attendee) => {
    if (currentAttendee) {
      await axios.put(
        `http://localhost:8080/api/v1/attendee/${currentAttendee._id}`,
        attendee
      );
    } else {
      await axios.post("http://localhost:8080/api/v1/attendee", attendee);
    }
    fetchAttendees();
    setModalOpen(false);
  };

  const handleDeleteAttendee = async (id) => {
    await axios.delete(`http://localhost:8080/api/v1/attendee/${id}`);
    fetchAttendees();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Attendee Management</h2>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => {
          setCurrentAttendee(null);
          setModalOpen(true);
        }}
      >
        Add Attendee
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {attendees.map((attendee) => (
          <div key={attendee._id} className="p-4 bg-white shadow rounded">
            <h3 className="font-bold text-lg">{attendee.name}</h3>
            <p>{attendee.email}</p>
            <div className="mt-2 flex justify-between">
              <button
                className="bg-yellow-500 text-white px-2 py-1 rounded"
                onClick={() => {
                  setCurrentAttendee(attendee);
                  setModalOpen(true);
                }}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => handleDeleteAttendee(attendee._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <AttendeeForm
          onSave={handleSaveAttendee}
          attendee={currentAttendee}
        />
      </Modal>
    </div>
  );
}

function AttendeeForm({ onSave, attendee }) {
  const [formData, setFormData] = useState(
    attendee || { name: "", email: "" }
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
        <label className="block">Email:</label>
        <input
          name="email"
          type="email"
          value={formData.email}
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

export default AttendeeManagement;
