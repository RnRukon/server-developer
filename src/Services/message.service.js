const Message = require("../Models/message.model");


exports.sendMessageService = async ({ chatId, message, user }) => {
    const mess = await Message.create({
        chatId: chatId,
        message: message,
        user: user
    });
    return mess;
};


exports.getMessageService = async (chatId) => {
    const mess = await Message.find({ chatId: chatId })
        .populate(['chatId', 'user'])
        .sort('lastUpdated');
    return mess;
};