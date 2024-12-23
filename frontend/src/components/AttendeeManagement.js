import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AttendeeManagement() {
  const [attendees, setAttendees] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedAttendee, setSelectedAttendee] = useState(""); 
  const [selectedEvent, setSelectedEvent] = useState(""); 
  const [newAttendee, setNewAttendee] = useState({ name: "", email: "" }); 
  const [editingAttendee, setEditingAttendee] = useState(null); 

  useEffect(() => {
    fetchAttendees();
    fetchEvents();
  }, []);

  const fetchAttendees = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/attendee");
      setAttendees(data.attendees);
    } catch (error) {
      console.error("Error fetching attendees:", error);
      toast.error("Failed to fetch attendees.");
    }
  };

  const fetchEvents = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/event");
      setEvents(data.events);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to fetch events.");
    }
  };

  const handleAssignEvent = async () => {
    if (!selectedAttendee || !selectedEvent) {
      toast.warn("Please select both an attendee and an event.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/v1/attendee/assign", {
        attendeeId: selectedAttendee,
        eventId: selectedEvent,
      });

      await fetchAttendees();
      toast.success("Attendee assigned to event successfully!");
      setSelectedAttendee(""); 
      setSelectedEvent(""); 
    } catch (error) {
      console.error("Error assigning attendee to event:", error);
      toast.error(error.response?.data?.message || "Failed to assign attendee to event.");
    }
  };

  const handleAddAttendee = async () => {
    if (!newAttendee.name || !newAttendee.email) {
      toast.warn("Please fill in both name and email.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/v1/attendee", newAttendee);
      await fetchAttendees();
      toast.success("Attendee added successfully!");
      setNewAttendee({ name: "", email: "" });
    } catch (error) {
      console.error("Error adding attendee:", error);
      toast.error("Failed to add attendee.");
    }
  };

  const handleDeleteAttendee = async (attendeeId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/attendee/${attendeeId}`);
      await fetchAttendees();
      toast.success("Attendee deleted successfully!");
    } catch (error) {
      console.error("Error deleting attendee:", error);
      toast.error("Failed to delete attendee.");
    }
  };

  const handleEditAttendee = async () => {
    if (!editingAttendee.name || !editingAttendee.email) {
      toast.warn("Please fill in both name and email.");
      return;
    }

    try {
      await axios.put(`http://localhost:8080/api/v1/attendee/${editingAttendee._id}`, editingAttendee);
      await fetchAttendees();
      toast.success("Attendee updated successfully!");
      setEditingAttendee(null); 
    } catch (error) {
      console.error("Error editing attendee:", error);
      toast.error("Failed to update attendee.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Attendee Management</h2>

      {/* Add New Attendee */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Add New Attendee</h3>
        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full mb-2"
          value={newAttendee.name}
          onChange={(e) => setNewAttendee({ ...newAttendee, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-2"
          value={newAttendee.email}
          onChange={(e) => setNewAttendee({ ...newAttendee, email: e.target.value })}
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleAddAttendee}
        >
          Add Attendee
        </button>
      </div>

      
      {editingAttendee && (
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Edit Attendee</h3>
          <input
            type="text"
            placeholder="Name"
            className="border p-2 w-full mb-2"
            value={editingAttendee.name}
            onChange={(e) => setEditingAttendee({ ...editingAttendee, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 w-full mb-2"
            value={editingAttendee.email}
            onChange={(e) => setEditingAttendee({ ...editingAttendee, email: e.target.value })}
          />
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded"
            onClick={handleEditAttendee}
          >
            Update Attendee
          </button>
        </div>
      )}

      
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Attendee List</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Assigned Event</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendees.map((attendee) => (
              <tr key={attendee._id}>
                <td className="border p-2">{attendee.name}</td>
                <td className="border p-2">{attendee.email}</td>
                <td className="border p-2">
                  {attendee.event ? attendee.event.name : "Not Assigned"}
                </td>
                <td className="border p-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => setEditingAttendee(attendee)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDeleteAttendee(attendee._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Select Attendee:</label>
        <select
          className="border p-2 w-full"
          value={selectedAttendee}
          onChange={(e) => setSelectedAttendee(e.target.value)}
        >
          <option value="">-- Select Attendee --</option>
          {attendees.map((attendee) => (
            <option key={attendee._id} value={attendee._id}>
              {attendee.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Select Event:</label>
        <select
          className="border p-2 w-full"
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
        >
          <option value="">-- Select Event --</option>
          {events.map((event) => (
            <option key={event._id} value={event._id}>
              {event.name}
            </option>
          ))}
        </select>
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleAssignEvent}
      >
        Assign Attendee to Event
      </button>


      <ToastContainer />
    </div>
  );
}

export default AttendeeManagement;
