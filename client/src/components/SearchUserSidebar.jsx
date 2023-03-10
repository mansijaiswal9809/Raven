import { Avatar, Box, Button, Stack, TextField } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useChatContext } from "../context/contextProvider";
import { deepPurple } from "@mui/material/colors";
import { RxCross2 } from "react-icons/rx";

const SearchUserSidebar = () => {
  const [users, setUsers] = useState([]);
  const { sidebarOpen, setSidebarOpen } = useChatContext();
  const { userL, setSelectedChat, chats, setChats } = useChatContext();
  const config = {
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${userL?.token}`,
    },
  };
  const SearchUser = async (e) => {
    const val = e.target.value;
    try {
      const { data } = await axios.get(
        `https://raven-api-klak.onrender.com/raven/user?search=${val}`,
        config
      );
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };
  const openChat = async (friendId) => {
    try {
      const { data } = await axios.post(
        "https://raven-api-klak.onrender.com/raven/chat",
        { friendId },
        config
      );
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setSidebarOpen(false);
    } catch (error) {
      console.log(error);
    }
    // console.log(data)
  };

  return (
    <Container
      sx={{
        position: "absolute",
        height: "100vh",
        top: 0,
        left: sidebarOpen ? 0 : "-500px",
        transition: "all 1s",
        backgroundColor: "black",
        width: {xs:"18rem", sm:"22rem"},
        overflowY: "scroll",
        zIndex: 999,
        boxShadow:"2px 2px 50px 2px black",
        color:"white"
      }}
    >
      <Stack direction="row" gap={3} aligncontents="center">
        <TextField
          id="outlined-basic"
          label="Search User"
          variant="outlined"
          sx={{ marginTop: "1rem", width: "85%" }}
          onChange={SearchUser}
          color="secondary"
          focused
        />
        <Button onClick={() => setSidebarOpen(false)} sx={{transform:"translateY(6px)"}} color="secondary">
          <RxCross2 size="40px" />
        </Button>
      </Stack>
      <Stack gap={2} marginTop={2} sx={{ cursor: "pointer" }}>
        {users &&
          users
            ?.filter((user) => user._id !== userL._id)
            .map((user, i) => (
              <Stack
                direction="row"
                alignItems="center"
                gap={2}
                key={i}
                onClick={() => openChat(user._id)}
              >
                <Avatar sx={{ bgcolor: deepPurple[500] }}>
                  {user?.name[0]}
                </Avatar>
                <Box>{user?.name}</Box>
              </Stack>
            ))}
      </Stack>
    </Container>
  );
};

export default SearchUserSidebar;
