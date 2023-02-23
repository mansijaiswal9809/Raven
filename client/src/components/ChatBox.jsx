import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import io from "socket.io-client";
import React, { useEffect, useState } from "react";
import { useChatContext } from "../context/contextProvider";
import { BsArrowLeft } from "react-icons/bs";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import axios from "axios";
import { AiFillEdit } from "react-icons/ai";
import ChatScroll from "./ChatScroll";
const ENDPOINT = "https://raven-api-klak.onrender.com";
var socket, selectedChatCompare;

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  // console.log(setFetchAgain)
  const {
    selectedChat,
    setSelectedChat,
    userL,
    notification,
    setNotification,
  } = useChatContext();
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  // console.log(messages)

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${userL.token}`,
        },
      };

      const { data } = await axios.get(
        `https://raven-api-klak.onrender.com/raven/message/${selectedChat._id}`,
        config
      );
      setLoading(false);
      setMessages(data);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      alert(error);
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      setNewMessage("");
      socket.emit("stop typing", selectedChat._id);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userL.token}`,
        },
      };
      try {
        const { data } = await axios.post(
          "https://raven-api-klak.onrender.com/raven/message",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
          );
          setMessages([...messages, data]);
          setFetchAgain(true);
          socket.emit("new message", data);
      } catch (error) {
        alert(error.message);
      }
    }
  };
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", userL);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
    if(selectedChat) setNotification(notification.filter((message)=>message.chat._id!==selectedChat._id))
  }, [selectedChat]);
  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          localStorage.setItem("notification",JSON.stringify(notification))
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <Container
      sx={{
        width: { xs: "100vw", md: "70vw" },
        display: {
          xs: !selectedChat ? "none" : "inline-block",
          md: "inline-block",
        },
        minHeight: "95vh",
        backgroundColor: "black",
        marginTop: "1rem",
        color: "#9d47c8",
        // padding: "1rem",
      }}
    >
      {selectedChat ? (
        <>
          <Box
            // pb={3}
            // px={2}
            // width="100%"
            fontFamily="Work sans"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              // backgroundColor:"red"
            }}
          >
            <Button onClick={() => setSelectedChat("")}>
              <BsArrowLeft size="30px" />
            </Button>
            {messages &&
              (!selectedChat.isGroupChat ? (
                <>
                  {selectedChat.users[0]._id === userL._id
                    ? selectedChat.users[1].name
                    : selectedChat.users[0].name}
                </>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  {selectedChat.groupAdmin._id === userL._id && (
                    <UpdateGroupChatModal
                      fetchMessages={fetchMessages}
                      fetchAgain={fetchAgain}
                      setFetchAgain={setFetchAgain}
                    >
                      <Button color="secondary">
                        <AiFillEdit size="30px" color="purple"/>
                      </Button>
                    </UpdateGroupChatModal>
                  )}
                </>
              ))}
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius={1}
            // overflowY="hidden"
            overflow="hidden"
          >
            {loading ? (
              <div>loading...</div>
            ) : (
              <Box
                className="messages"
                sx={{
                  height: "68vh",
                  padding: { xs: "0.5rem", sm: "1rem" },
                  backgroundColor: "#2E1A47",
                  borderRadius: "8px",
                }}
              >
                <ChatScroll messages={messages} />
              </Box>
            )}

            {istyping ? <div>typing...</div> : <></>}
            <Box color="white">
            <TextField
              label="Enter a message.."
              onChange={typingHandler}
              fullWidth
              sx={{marginTop:'9px', color:"white", borderColor:"purple"}}
              onKeyDown={sendMessage}
              color="secondary"
              focused
              className="text"
              variant="filled"
              />
              </Box>
          </Box>
        </>
      ) : (
        // to get socket.io on same page
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Typography fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default ChatBox;
