const express = require("express");
const cors = require("cors");
const app = express();
//middlewares
app.use(express.json());
app.use(cors());


app.use(express.static('./Public'));



// routers require

const users = require("./Routes/user.route");
const jobCircular = require("./Routes/jobCircular.route");
const chat = require("./Routes/Chat.route");
const message = require("./Routes/message.route");


app.get("/", (req, res) => {
    res.send("Server is Running! YaY!");
});

// routes ------------------------
app.use("/api/v1/developer/users", users);
app.use("/api/v1/developer/jobCircular", jobCircular);
app.use("/api/v1/developer/chat", chat);
app.use("/api/v1/developer/message", message);


app.use("*", (req, res, nex) => {
    res.status(404).send(`
    <div style="
    text-align:center;
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    color: red ; 
    "><h1>Note Found Route (404)</h1></div>`)
})

module.exports = app;