let chatshat = require("../model/chat.model");
let chatrecord = (request, response) => {
    let chat = request.body;
    chatshat.insertMany(chat, (err, result) => {
        if (!err) {
            response.send("Saved.")
        } else {
            response.send(err);
        }
    })
}
module.exports = { chatrecord }