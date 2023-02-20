import { Button, Container, FormControl, TextField } from "@mui/material";
import React, { useState } from "react";

const SignUp = () => {
  const [formdata, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSubmit = () => {
    console.log(formdata);
  };
  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };
  return (
    <Container sx={{border: "1px solid grey", padding:"1rem" , minHeight:"300px", boxSizing:"border-box"}}>
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
