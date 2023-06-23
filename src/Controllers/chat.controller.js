const { createChatService, getChatService } = require("../Services/chat.service");


exports.createChat = async (req, res) => {
    try {

        const { receiver_id, sender_id } = req.query;

        const data = await createChatService({ receiver_id, sender_id });
        res.status(200).json({
            result: data,
            status: "success",
            message: "Create chat is Successfully",
        });
    } catch (error) {

        console.log(error);
        res.status(500).json({
            status: "fail",
            error: 'Server error, please try ageing'
        });
    }
};
exports.getChat = async (req, res) => {
    try {
        const data = await getChatService();
        res.status(200).json({
            result: data,
            status: "success",
            message: "Get chat is Successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: 'Server error, please try ageing'
        });
    }
};