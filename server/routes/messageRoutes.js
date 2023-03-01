import express  from "express";
import {
  allMessages,
  sendMessage,
} from "../controllers/messageControllers.js"
import auth from "../middleware/auth.js"

const router = express.Router();

router.route("/:chatId").get(auth, allMessages);
router.route("/").post(auth, sendMessage);

export default router;
