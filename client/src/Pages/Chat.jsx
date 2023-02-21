import { Stack } from "@mui/material";
import React, { useState } from "react";
import AllChat from "../components/AllChat";
import ChatBox from "../components/ChatBox";
import { useChatContext } from "../context/contextProvider";

const Chat = () => {
  const [fetchAgain, setFetchagain] = useState();
  const { userL } = useChatContext();
  return (
    <Stack direction="row" gap={2} margin={1} borderRadius={3}>
      {userL && <AllChat  fetchAgain={fetchAgain}/>}
      {userL && <ChatBox />}
    </Stack>
  );
};

export default Chat;
