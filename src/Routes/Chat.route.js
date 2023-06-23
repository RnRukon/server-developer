const express = require("express");
const verifyToken = require("../Middleware/verifyToken");
const { createChat, getChat } = require("../Controllers/chat.controller");
const router = express.Router();


router.post("/createChat", verifyToken, createChat);
router.get("/getChat", verifyToken, getChat);

module.exports = router;