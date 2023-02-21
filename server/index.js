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
app.use(cors())
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("welcome to chatapp")
})
app.use("/raven/user",userRoutes)
app.use("/raven/chat",chatRoutes)
app.use("/raven/message", messageRoutes);

app.listen(8080,async()=>{
    try {
        await connection
        console.log("connection success")
    } catch (error) {
        console.log(error)
    }
    console.log(`server running on port ${8080}`)
})