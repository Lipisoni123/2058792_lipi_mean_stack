let responses = ["Sorry , I have no clue",
    "Yes, I am.", "Its easy , B",
    "I am damn 100% sure",
    "Thank you for the compliment"];

function getResponse(msg) {
    if (msg == "Are you ready to answer?") return 1;
    else if (msg == "What is after A") return 2;
    else if (msg == "Are you sure?") return 3;
    else if (msg == "Wao, you are awesome. simple Brilliant!!") return 4;
    else return 0;
}

let express = require("express");

let app = express();

let http = require("http").Server(app);

let io = require('socket.io')(http);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "//client.html");
})

io.on("connection", (socket) => {
    console.log("Client connected");

    socket.emit("startup", "connected.");


    socket.on("Client_Message", (msg) => {
        let messageToClient = responses[getResponse(msg[1])];

        let messageToConsole = "Hello " + msg[0] + ",\nClient Message: " + msg[1] + "\nServer Message: " + messageToClient;
        console.log(messageToConsole);

        socket.emit("Server_Message", messageToClient);
    })

})


http.listen(9090, () => console.log("Server running on port number 9090."));