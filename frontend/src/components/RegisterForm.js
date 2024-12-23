import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from "axios";

const RegisterForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:8080/api/v1/user/register", data);
      if (res.data.success) {
        alert(res.data.message);
        window.location.href = "/login";
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Registration failed!");
    }
  };

  return (
    <Container>
      <Typography variant="h4">Register</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField {...register("fullName")} label="Full Name" fullWidth required margin="normal" />
        <TextField {...register("email")} label="Email" type="email" fullWidth required margin="normal" />
        <TextField {...register("password")} label="Password" type="password" fullWidth required margin="normal" />
        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </form>
    </Container>
  );
};

export default RegisterForm;

