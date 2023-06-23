const Mongoose = require("mongoose");
const { ObjectId } = Mongoose.Schema.Types;

const chatSchema = Mongoose.Schema({
    sender: {
        type: ObjectId,
        require: [true, "Sender ID is required"],
        ref: "User"
    },
    receiver: {
        type: ObjectId,
        require: [true, "Receiver ID is required"],
        ref: "User"
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


const Chat = Mongoose.model('Chat', chatSchema);

module.exports = Chat;