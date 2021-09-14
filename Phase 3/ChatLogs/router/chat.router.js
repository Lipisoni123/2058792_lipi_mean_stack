let express = require("express");
let router = express.Router();
let chatController = require("../controller/chat.controller")
router.post("/save", chatController.chatrecord);
module.exports = router;