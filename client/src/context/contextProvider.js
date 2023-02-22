import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const context = createContext();
const ContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [formdata, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState();
  const [userL, setUserL] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    setUserL(userInfo);

    if (!userInfo) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  return (
    <context.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        formdata,
        setFormData,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        userL,
        notification,
        setNotification
      }}
    >
      {children}
    </context.Provider>
  );
};

export default ContextProvider;

export const useChatContext = () => {
  return useContext(context);
};
