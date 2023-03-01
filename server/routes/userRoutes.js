import express  from "express"
import { registerUser, loginUser, allUser } from  "../controllers/userController.js"
import auth from "../middleware/auth.js"
const router= express.Router()
// router.route("/").get(allUsers)
router.post("/",registerUser)
router.post("/login",loginUser)
router.get("/",auth,allUser)
export default router