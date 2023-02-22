import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useChatContext } from "../context/contextProvider";
import { useState } from "react";
import { Avatar, Chip, FormControl, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import { deepOrange } from "@mui/material/colors";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ children }) {
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { userL, chats, setChats } = useChatContext();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = async () => {
    if (!groupChatName || selectedUsers.length<2) {
      alert("Please select 2 users and a proper chat name");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userL.token}`,
        },
      };
      const { data } = await axios.post(
        "http://localhost:8080/raven/chat/group",
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      handleClose();
      alert("new group chat created");
      setGroupChatName("")
      setSearchResult([])
      setSearch("")
      setSelectedUsers([])
    } catch (error) {
      alert("failed to create group chat");
    }
  };
  const handlegroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      alert("user already added");
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };
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
        `http://localhost:8080/raven/user?search=${search}`,
        config
      );
      setSearchResult(data);
      //   console.log(data);
    } catch (error) {
      alert(error);
    }
  };
  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Group Chat
          </Typography>
          <Stack gap={2} id="modal-modal-description" sx={{ mt: 2 }}>
            <FormControl>
              <TextField
                placeholder="Chat Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
                fullWidth
              />
            </FormControl>
            <FormControl>
              <TextField
                label="Add friends"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
                fullWidth
              />
            </FormControl>
          </Stack>
          <Stack direction="row" gap={1} marginY={1} flexWrap="wrap">
            {selectedUsers.map((u,i) => (
              <Chip
                label={u.name}
                onDelete={() => handleDelete(u)}
                color="success"
                key={i}
              />
            ))}
          </Stack>
          <Stack gap={1} direction="row" flexWrap="wrap" marginY={1}>
            {searchResult &&
              searchResult
                ?.slice(0, 4)
                ?.filter((user) => user._id !== userL._id)
                .map((user,i) => (
                  <Stack
                    component={Button}
                    direction="row"
                    alignItems="center"
                    gap={2}
                    key={i}
                    onClick={() => handlegroup(user)}
                  >
                    <Avatar sx={{ bgcolor: deepOrange[500] }}>
                      {user?.name[0]}
                    </Avatar>
                    <Box>{user?.name}</Box>
                  </Stack>
                ))}
          </Stack>
          <Button onClick={handleSubmit} variant="contained" fullWidth>
            Create Chat
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
