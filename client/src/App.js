import "./App.css";
import Auth from "./Pages/auth";
import NavBar from "./components/NavBar";
import SearchUserSidebar from "./components/SearchUserSidebar";
import { Routes, Route,useNavigate} from "react-router-dom"
import Chat from "./Pages/Chat";
import { useEffect } from "react";
import { useChatContext } from "./context/contextProvider";

function App() {
  const {userL}= useChatContext()
  return (
      <div className="App">
       {userL && <SearchUserSidebar />}
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Auth/>}/>
          <Route exact path="/chats" element={<Chat/>}/>
        </Routes>
      </div>

  );
}

export default App;
