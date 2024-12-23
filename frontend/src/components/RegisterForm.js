import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Container, Typography, CircularProgress } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true); 
    try {
      const res = await axios.post("http://localhost:8080/api/v1/user/register", data);
      if (res.data.success) {
        toast.success(res.data.message); 
        window.location.href = "/login"; 
      } else {
        toast.error(res.data.message); 
      }
    } catch (err) {
      console.error(err);
      toast.error("Registration failed!"); 
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Container>
      <Typography variant="h4">Register</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("fullName")}
          label="Full Name"
          fullWidth
          required
          margin="normal"
        />
        <TextField
          {...register("email")}
          label="Email"
          type="email"
          fullWidth
          required
          margin="normal"
        />
        <TextField
          {...register("password")}
          label="Password"
          type="password"
          fullWidth
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
        </Button>
      </form>

     
      <ToastContainer />
    </Container>
  );
};

export default RegisterForm;
