import {
  Button,
  Container,
  FormControl,
  TextField,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useChatContext } from "../context/contextProvider";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const { formdata, setFormData } = useChatContext();
  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        "https://raven-api-klak.onrender.com/raven/user/login",
        formdata
      );
      // console.log(data)
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/chats");
    } catch (error) {
      // <Alert sx={{width:"100%"}} variant="filled" severity="error">
      //   {error.message}
      // </Alert>;
      alert(error.message);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };
  return (
    <Container
      sx={{
        padding: "1rem",
        backgroundColor: "black",
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
          color="secondary"
          focused
        />
        <TextField
          type="password"
          label="Password"
          name="password"
          value={formdata.password}
          onChange={handleChange}
          color="secondary"
          focused
        />
        <Button type="submit" variant="contained" onClick={handleSubmit}  color="secondary">
          Submit
        </Button>
      </FormControl>
    </Container>
  );
};

export default SignIn;
