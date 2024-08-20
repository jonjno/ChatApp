import express from "express";
import { getMessage, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/send/:id", protectRoute, sendMessage);
// Its kind of an authorization
// logedin user can send message

router.get("/:id", protectRoute, getMessage);
export default router;
