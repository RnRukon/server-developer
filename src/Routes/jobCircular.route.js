const express = require("express");
const router = express.Router();


const verifyToken = require("../Middleware/verifyToken");
const { postJobCircular, getJobCircular, getMyJobCircular, getSingleJobCircular, deleteJobCircular, updateJobCircular, apply } = require("../Controllers/jobCircular.controller");




router.post("/postJobCircular", verifyToken, postJobCircular);
router.get("/getAllJobCircular", getJobCircular);
router.get("/getMyJobCircular", verifyToken, getMyJobCircular);
router.get("/getSingleJobCircular/:id", getSingleJobCircular);
router.delete("/deleteJobCircular/:id", verifyToken, deleteJobCircular);
router.patch("/updateJobCircular/:id", verifyToken, updateJobCircular);
router.patch("/apply/:id", verifyToken, apply);









module.exports = router;