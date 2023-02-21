import React from 'react'
import ScrollableFeed from "react-scrollable-feed"

const ChatScroll = ({messages}) => {
  return (
    <ScrollableFeed>
    {messages &&
      messages.map((m, i) => (
        <div style={{ display: "flex" }} key={m._id}>
          {m.content}
        </div>
      ))}
  </ScrollableFeed>
  )
}

export default ChatScroll
