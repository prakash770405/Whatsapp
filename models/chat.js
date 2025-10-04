const monsgoose = require('mongoose');

const chatSchema = new monsgoose.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    msg: { type: String, maxLength: 1000 },
    created_at: { type: Date, default: Date.now }
});

const Chat = monsgoose.model('Chat', chatSchema);
module.exports = Chat;
//created_at: { type: Date, default: Date.now }