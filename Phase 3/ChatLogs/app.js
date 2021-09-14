let express = require("express")
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let cors = require("cors");
let routerChat = require("./router/chat.router");
let { request, response } = require("express");

let app = express();
app.use(cors());
app.use(bodyParser.json())

let ws = require("express-ws")(app);
let url = "mongodb://localhost:27017/ChatLogTCS"
mongoose.connect(url).then(res => console.log("connected")).catch(error => console.log(error));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/app.html");
})
app.use("/api/chat", routerChat);
app.ws("/", (socket, request) => {
    console.log("Client Connected");

    socket.on("message", textmsg => {
        console.log("Server say: " + textmsg);
        socket.send("Message Stored");
    })

    socket.send("Connected");
})
app.listen(9090, () => console.log("Using port 9090"));