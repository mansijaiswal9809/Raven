const express= require("express")
const dotenv= require("dotenv")
dotenv.config()
const cors= require("cors")
// const { connection } = require("./config/db")
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes")
const messageRoutes = require("./routes/messageRoutes")
const { connection } = require("./config/db")
const app= express()
const port= process.env.PORT || 8080
app.use(cors())
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("welcome to chatapp")
})
app.use("/raven/user",userRoutes)
app.use("/raven/chat",chatRoutes)
app.use("/raven/message", messageRoutes);

const server=app.listen(port,async()=>{
    try {
        await connection
        console.log("connection success")
    } catch (error) {
        console.log(error)
    }
    console.log(`server running on port ${port}`)
})

const io=require("socket.io")(server,{
    pingTimeOut:60000,
    cors:{
        origin: "http://localhost:3000",
    }
})

io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
      socket.join(userData._id);
      socket.emit("connected");
    });
  
    socket.on("join chat", (room) => {
      socket.join(room);
      console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  
    socket.on("new message", (newMessageRecieved) => {
      var chat = newMessageRecieved.chat;
  
      if (!chat.users) return console.log("chat.users not defined");
  
      chat.users.forEach((user) => {
        if (user._id == newMessageRecieved.sender._id) return;
  
        socket.in(user._id).emit("message recieved", newMessageRecieved);
      });
    });
})