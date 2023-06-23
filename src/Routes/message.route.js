const express = require("express");
const verifyToken = require("../Middleware/verifyToken");
const { sendMessage, getMessage } = require("../Controllers/message.controller");
const router = express.Router();


router.post("/sendMessage/:chatId", verifyToken, sendMessage);
router.get("/getMessage/:chatId", verifyToken, getMessage);

module.exports = router;