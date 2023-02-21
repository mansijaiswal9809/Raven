import { Button, Container, FormControl, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useChatContext } from "../context/contextProvider";

const SignUp = () => {
  const { formdata, setFormData } = useChatContext();
  const handleSubmit = async () => {
    // console.log(formdata)
    const { data } = await axios.post(
      "http://localhost:8080/raven/user",
      formdata
    );
    // console.log(data)
    setFormData({
      name: "",
      email: "",
      password: "",
    });
    localStorage.setItem("user", JSON.stringify(data));
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
        boxSizing: "border-box",
        backgroundColor: "white",
      }}
    >
      <FormControl
        sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <TextField
          type="text"
          label="Name"
          fullWidth
          name="name"
          value={formdata.name}
          onChange={handleChange}
        />
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

export default SignUp;
