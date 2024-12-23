import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login({ onLogin }) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); 

  const toggleMode = () => setIsLoginMode(!isLoginMode);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const url = isLoginMode
        ? "http://localhost:8080/api/v1/user/login"
        : "http://localhost:8080/api/v1/user/register";
      const { data } = await axios.post(url, formData);

      if (data.success) {
        if (isLoginMode) {
          onLogin(data.token);
          toast.success("Login successful!");
        } else {
          toast.success("Registration successful. Please log in.");
          toggleMode();
        }
      }
    } catch (error) {
      console.error("Authentication failed", error);
      toast.error("Error: " + (error.response?.data?.message || "Something went wrong"));
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4">{isLoginMode ? "Login" : "Register"}</h2>
        {!isLoginMode && (
          <div className="mb-4">
            <label className="block">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="border w-full p-2"
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border w-full p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded"
          disabled={loading} 
        >
          {loading ? "Loading..." : isLoginMode ? "Login" : "Register"}
        </button>
        <p className="mt-4 text-center">
          {isLoginMode ? "New here?" : "Already have an account?"}{" "}
          <span className="text-blue-500 cursor-pointer" onClick={toggleMode}>
            {isLoginMode ? "Register" : "Login"}
          </span>
        </p>
      </form>

     
      <ToastContainer />
    </div>
  );
}

export default Login;
