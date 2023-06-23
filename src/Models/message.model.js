const Mongoose = require("mongoose");
const { ObjectId } = Mongoose.Schema.Types;

const messageSchema = Mongoose.Schema({
    chatId: {
        type: ObjectId,
        require: [true, "chatId ID is required"],
        ref: 'Chat'
    },
    message: {
        type: String,
        require: [true, "Message is required"],
    },
    user: {
        type: ObjectId,
        require: [true, "User ID is required"],
        ref: 'User'
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
    },

},
    {
        timestamps: true,
    }
);


const Message = Mongoose.model('Message', messageSchema);

module.exports = Message;