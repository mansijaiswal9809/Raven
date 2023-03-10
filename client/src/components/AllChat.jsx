import { Button, Stack, Tooltip, Typography } from "@mui/material";
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
  const {
    selectedChat,
    setSelectedChat,
    userL,
    chats,
    setChats,
    notification,
  } = useChatContext();
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
        "https://raven-api-klak.onrender.com/raven/chat",
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
    <Box
      sx={{
        width: { xs: "100vw", md: "30vw" },
        // width:"30vw",
        display: { xs: selectedChat ? "none" : "flex", md: "flex" },
        flexDirection: "column",
        alignContent: "center",
        minHeight: "95vh",
        backgroundColor: "black",
        marginTop: "1rem",
        color: "#9d47c8",
        padding: { xs: "0.5rem", sm: "1rem" },
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Box>My Chats</Box>
        <BasicModal>
          <Button
            color="secondary"
            variant="outlined"
            startIcon={<AiOutlinePlus />}
          >
            Create Group Chat
          </Button>
        </BasicModal>
      </Stack>
      <Box
        p={3}
        width="90%"
        height="100%"
        borderRadius={2}
        sx={{ alignSelf: "center" }}
      >
        {chats && (
          <Stack sx={{ overflowY: "scroll", height: "78vh" }} gap={1}>
            {chats
              .filter((chat) => chat.users.length >= 2)
              .map((chat, i) => (
                <Box
                  onClick={() => setSelectedChat(chat)}
                  sx={{
                    backgroundColor:
                      selectedChat === chat ? "#6e1e96" : "#2E1A47",
                  }}
                  color={"white"}
                  px={3}
                  py={2}
                  key={i}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
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
                          ? chat.latestMessage.content.substring(0, 38) + "..."
                          : chat.latestMessage.content}
                      </Typography>
                    )}
                  </Box>
                  {notification.filter((m) => m.chat._id === chat._id).length >
                    0 && (
                    <Tooltip title="unread messages" arrow>
                      <span
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          backgroundColor: "#6e1e96",
                          display: "grid",
                          placeContent: "center",
                        }}
                      >
                        {
                          notification.filter((m) => m.chat._id === chat._id)
                            .length
                        }
                      </span>
                    </Tooltip>
                  )}
                </Box>
              ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default AllChat;
