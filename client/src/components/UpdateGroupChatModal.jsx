import {
  Avatar,
  Box,
  Button,
  Chip,
  FormControl,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import axios from "axios";
import React, { useState } from "react";
import { useChatContext } from "../context/contextProvider";

const UpdateGroupChatModal = ({ children, setFetchAgain }) => {
  // console.log(setFetchAgain)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { selectedChat, setSelectedChat, userL } = useChatContext();
  const config = {
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${userL?.token}`,
    },
  };
  const handleSearch = async (query) => {
    setSearch(query);
    try {
      const { data } = await axios.get(
        `https://raven-api-klak.onrender.com/raven/user?search=${search}`,
        config
      );
      const users = selectedChat.users.map((user) => user._id);
      setSearchResult(data.filter((user) => !users.includes(user._id)));
    } catch (error) {
      alert(error);
    }
  };
  const renameGroup = async () => {
    alert("You are Sure to rename this group");
    try {
      const { data } = await axios.put(
        "https://raven-api-klak.onrender.com/raven/chat/rename",
        { chatId: selectedChat._id, chatName: groupChatName }
      );
      setSelectedChat(data);
      handleClose();
      setFetchAgain(true);
    } catch (error) {
      alert(error.message);
    }
  };
  const handleDelete = async (delUser) => {
    alert("You are sure to delete this user");
    // console.log(delUser)
    try {
      const { data } = await axios.put(
        "https://raven-api-klak.onrender.com/raven/chat/groupremove",
        { chatId: selectedChat._id, userId: delUser._id },
        config
      );
      setSelectedChat(data);
      handleClose();
      setFetchAgain(true);
    } catch (error) {
      alert("error", error.message);
    }
  };
  const AddUser = async (user) => {
    alert("You are sure to add this User");
    try {
      const { data } = await axios.put(
        "https://raven-api-klak.onrender.com/raven/chat/groupadd",
        { chatId: selectedChat._id, userId: user._id },
        config
      );
      setSelectedChat(data);
      handleClose();
      setFetchAgain(true);
    } catch (error) {
      alert("error", error.message);
    }
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {xs:250,sm:400},
    bgcolor: "black",
    border: "2px solid #610a5e",
    boxShadow: 24,
    p: {xs:2, sm:4},
  };
  return (
    <div>
      <Box onClick={handleOpen}>{children}</Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" color="secondary">
            Edit your Group
          </Typography>
          <Stack gap={2} id="modal-modal-description" sx={{ mt: 2 }}>
            <FormControl
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TextField
                sx={{ width: "70%" }}
                label="Rename Your Group"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
                color="secondary"
                focused
              />
              <Button
                variant="contained"
                sx={{ width: "30%", transform:"transLateY(-3px)" }}
                onClick={renameGroup}
                color="secondary"
              >
                Rename Group
              </Button>
            </FormControl>
            <FormControl>
              <TextField
                label="Add Users"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
                fullWidth
                color="secondary"
                focused
              />
            </FormControl>
          </Stack>
          <Stack direction="row" gap={1} marginY={1} flexWrap="wrap">
            {selectedChat.users.map((u, i) => (
              <Chip
                label={u.name}
                color="secondary"
                onDelete={() => handleDelete(u)}
                key={i}
              />
            ))}
          </Stack>
          <Stack gap={1} direction="row" flexWrap="wrap" marginY={1}>
            {searchResult &&
              searchResult
                ?.slice(0, 4)
                ?.filter((user) => user._id !== userL._id)
                .map((user) => (
                  <Stack
                    component={Button}
                    onClick={() => AddUser(user)}
                    direction="row"
                    alignItems="center"
                    gap={2}
                    key={user?._id}
                  >
                    <Avatar sx={{ bgcolor: deepPurple[500] }}>
                      {user?.name[0]}
                    </Avatar>
                    <Box>{user?.name}</Box>
                  </Stack>
                ))}
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateGroupChatModal;
