const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        required: "Chatroom is required!",
        ref: "Conversation",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: "user is required!",
        ref: "User",
    },
    name: { type: String },
    content: {
        type: String,
        required: "Message is required!",
    },
    type: { type: String, default: 'text' },//option to know if the message is text/img/video or file
    date: { type: Date, default: Date.now() },
    viewers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model("Message", messageSchema);