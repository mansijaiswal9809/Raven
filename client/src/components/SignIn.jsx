import { Button, Container, FormControl, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useChatContext } from "../context/contextProvider";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate= useNavigate()
  const { formdata, setFormData } = useChatContext();
  const handleSubmit = async() => {
    const {data}= await axios.post("http://localhost:8080/raven/user/login",formdata)
    // console.log(data)
    localStorage.setItem("user",JSON.stringify(data))
    navigate("/chats")
  };
  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };
  return (
    <Container
      sx={{
        border: "1px solid grey",
        padding: "1rem",
        minHeight: "300px",
        backgroundColor: "white",
      }}
    >
      <FormControl
        sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <TextField
          type="email"
          label="Email"
          name="email"
          value={formdata.email}
          onChange={handleChange}
        />
        <TextField
          type="password"
          label="Password"
          name="password"
          value={formdata.password}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </FormControl>
    </Container>
  );
};

export default SignIn;
