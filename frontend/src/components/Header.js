import React from "react";
import { NavLink } from "react-router-dom";

function Header({ onLogout }) {
  return (
    <header className="bg-blue-600 text-white py-3 px-6">
      <nav className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Event Management Dashboard</h1>
        <div className="space-x-4">
          <NavLink to="/events" className="hover:underline">
            Events
          </NavLink>
          <NavLink to="/attendees" className="hover:underline">
            Attendees
          </NavLink>
          <NavLink to="/tasks" className="hover:underline">
            Tasks
          </NavLink>
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
