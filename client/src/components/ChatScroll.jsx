import { Avatar, Tooltip } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { useChatContext } from "../context/contextProvider";
const isSameSenderMargin = (messages, m, i, userId) => {
  // console.log(i === messages.length - 1);

  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};
const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};
const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};
const ChatScroll = ({ messages }) => {
  const { userL } = useChatContext();
  // console.log(messages);
  return (
    <ScrollableFeed
      forceScroll={true}
      sx={{ height: "65vh" }}
    >
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, userL._id) ||
              isLastMessage(messages, i, userL._id)) && (
              <Tooltip title={m.sender.name} placement="bottom-start" arrow>
                <Avatar sx={{ bgcolor: deepPurple[500] }}>
                  {m.sender.name[0]}
                </Avatar>
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: "#6e1e96",
                color:"white",
                marginLeft: isSameSenderMargin(messages, m, i, userL._id),
                marginTop: isSameUser(messages, m, i, userL._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ChatScroll;
