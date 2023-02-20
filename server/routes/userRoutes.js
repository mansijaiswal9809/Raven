const express= require("express")
const { registerUser, loginUser, allUser } = require("../controllers/userController")
const auth = require("../middleware/auth")
const router= express.Router()
// router.route("/").get(allUsers)
router.post("/",registerUser)
router.post("/login",loginUser)
router.get("/",auth,allUser)
module.exports=router