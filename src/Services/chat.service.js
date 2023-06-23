const Chat = require("../Models/Chat.model");



exports.createChatService = async ({ receiver_id, sender_id }) => {
    const chat = await Chat.create({
        sender: sender_id,
        receiver: receiver_id
    });
    return chat;
};


exports.getChatService = async () => {
    const chat = await Chat.find({}).populate(['receiver', 'sender']).sort('-lastUpdated');
    return chat;
};
exports.findByIdAndUpdateService = async ({ chatId }) => {
    const chat = await Chat.findByIdAndUpdate({ _id: chatId }, {
        lastUpdated: Date.now()
    });
    return chat;
};

