const express = require("express");

const { registration, login, getMe, updateProfile, makeAdmin, getAllUser, getSingleUser } = require("../Controllers/user.controller");
const verifyToken = require("../Middleware/verifyToken");


const router = express.Router();


router.post("/registration", registration);
router.post("/login", login);
router.get("/getMe", verifyToken, getMe);
router.patch("/updateProfile", verifyToken, updateProfile);
router.get("/getAllUser", getAllUser);
router.get("/getSingleUser/:id", getSingleUser);
router.patch("/makeAdmin", verifyToken, makeAdmin);


module.exports = router;