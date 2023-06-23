const { findByIdAndUpdateService } = require("../Services/chat.service");
const { sendMessageService, getMessageService } = require("../Services/message.service");
const { findByEmailUserService } = require("../Services/user.service");



exports.sendMessage = async (req, res) => {
    try {

        const { chatId } = req.params;
        const message = req.body.message;
        await findByIdAndUpdateService({ chatId });

        const findUser = await findByEmailUserService(req.user.email);
        const user = findUser?._id;



        const data = await sendMessageService({ chatId, message, user });
        res.status(200).json({
            result: data,
            status: "success",
            message: "Message send is Successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: 'Server error, please try ageing'
        });
    }
};
exports.getMessage = async (req, res) => {
    try {

        const { chatId } = req.params;
        const data = await getMessageService(chatId);
        res.status(200).json({
            result: data,
            status: "success",
            message: "Message get is Successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: 'Server error, please try ageing'
        });
    }
};