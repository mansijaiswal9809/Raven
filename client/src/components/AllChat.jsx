import { Button, Container, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useChatContext } from "../context/contextProvider";
import { AiOutlinePlus } from "react-icons/ai";
import BasicModal from "./BasicModal";


const AllChat = ({ fetchAgain, setFetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const { selectedChat, setSelectedChat, userL, chats, setChats } =
    useChatContext();
  // console.log(chats)
  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userL.token}`,
        },
      };

      const { data } = await axios.get(
        "http://localhost:8080/raven/chat",
        config
      );
      setChats(data);
      setFetchAgain(false);
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("user")) || null);
    fetchChats();
    // console.log("errrrrrr")
  }, [fetchAgain, userL]);
  return (
    <Container
      sx={{
        width: "30vw",
        minHeight: "95vh",
        backgroundColor: "white",
        marginTop: "1rem",
        color: "balck",
        padding: "1rem",
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Box>My Chats</Box>
        <BasicModal>
          <Button variant="outlined" startIcon={<AiOutlinePlus />}>
            Create Group Chat
          </Button>
        </BasicModal>
      </Stack>
      <Box p={3} w="100%" h="100%" borderRadius="lg">
        {chats && (
          <Stack sx={{ overflowY: "scroll", height: "78vh" }} gap={1}>
            {chats
              .filter((chat) => chat.users.length >= 2)
              .map((chat, i) => (
                <Box
                  onClick={() => setSelectedChat(chat)}
                  sx={{
                    backgroundColor:
                      selectedChat === chat ? "#38B2AC" : "#E8E8E8",
                  }}
                  color={selectedChat === chat ? "white" : "black"}
                  px={3}
                  py={2}
                  key={i}
                >
                  <Typography>
                    {!chat?.isGroupChat && chat.users.length === 2
                      ? chat?.users[0]._id === loggedUser._id
                        ? chat?.users[1].name
                        : chat?.users[0].name
                      : chat?.chatName}
                  </Typography>
                  {chat.latestMessage && (
                    <Typography fontSize="xs">
                      <b>{chat.latestMessage.sender.name} : </b>
                      {chat.latestMessage.content.length > 50
                        ? chat.latestMessage.content.substring(0, 51) + "..."
                        : chat.latestMessage.content}
                    </Typography>
                  )}
                </Box>
              ))}
          </Stack>
        )}
      </Box>
    </Container>
  );
};

export default AllChat;
