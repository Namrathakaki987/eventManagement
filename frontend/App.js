import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import EventManagement from "./components/EventManagement";
import AttendeeManagement from "./components/AttendeeManagement";
import TaskTracker from "./components/TaskTracker";
import Login from "./components/Login";
import  { useState } from "react";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("authToken")
  );

  const handleLogin = (token) => {
    localStorage.setItem("authToken", token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        {isLoggedIn && <Header onLogout={handleLogout} />}
        <div className="p-4">
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Navigate to="/events" />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/events"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <EventManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/attendees"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <AttendeeManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tasks"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <TaskTracker />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
