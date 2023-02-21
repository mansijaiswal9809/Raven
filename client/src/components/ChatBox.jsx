import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useChatContext } from "../context/contextProvider";
import { BsArrowLeft } from "react-icons/bs";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import axios from "axios";
import { AiFillEdit } from "react-icons/ai";
import ChatScroll from "./ChatScroll";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat, setSelectedChat, userL } = useChatContext();
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };
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
        `http://localhost:8080/raven/message/${selectedChat._id}`,
        config
      );
      setLoading(false);
      setMessages(data);
    } catch (error) {
      alert(error);
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      // socket.emit("stop typing", selectedChat._id);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userL.token}`,
        },
      };
      try {
        const { data } = await axios.post(
          "http://localhost:8080/raven/message",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
          );
          setNewMessage("");
          setMessages([...messages, data]);
        } catch (error) {
          alert(error.message);
        }
    }
  };
  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);
  return (
    <Container
      sx={{
        width: "70vw",
        minHeight: "95vh",
        backgroundColor: "white",
        marginTop: "1rem",
        color: "black",
        padding: "1rem",
      }}
    >
      {selectedChat ? (
        <>
          <Typography
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            width="100%"
            fontFamily="Work sans"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconButton
              d={{ base: "flex", md: "none" }}
              icon={<BsArrowLeft size="30px" />}
              onClick={() => setSelectedChat("")}
            />
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
                      <Button>
                        <AiFillEdit size="30px" />
                      </Button>
                    </UpdateGroupChatModal>
                  )}
                </>
              ))}
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            // overflowY="hidden"
            overflow="hidden"
          >
            {loading ? (
              <div>loading...</div>
            ) : (
              <div className="messages">
                <ChatScroll messages={messages} />
              </div>
            )}

            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              required
              mt={3}
            >
              {istyping ? <div>typing...</div> : <></>}
              <TextField label="Enter a message.." onChange={typingHandler} />
            </FormControl>
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
