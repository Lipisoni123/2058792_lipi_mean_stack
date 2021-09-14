let mongoose = require("mongoose")
mongoose.pluralize(null);
let cSchema = mongoose.Schema({
    _id: Number,
    username: String,
    message: String
});
let chatshat = mongoose.model("ChatLog", cSchema);
module.exports = chatshat;