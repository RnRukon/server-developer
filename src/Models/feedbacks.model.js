const Mongoose = require("mongoose");
const validator = require("validator");

const feedbacksSchema = Mongoose.Schema({
    fname: {
        type: String,
        require: [true, "Name is required"],
        trim: true,
    },
    lname: {
        type: String,
        require: [true, "Name is required"],
        trim: true,
    },

    email: {
        type: String,
        require: true,
        trim: true,
        require: [true, "Email is required"],
        validate: [validator.isEmail, "Provide a valid Email"],

    },
    feedback: {
        type: String,
        require: [true, "massage is required"],
        trim: true,
    },
    rating: {
        type: Number,
        trim: true,
    },
    photo: String

},
    {
        timestamps: true,
    }
);


const Feedback = Mongoose.model('Feedback', feedbacksSchema);

module.exports = Feedback;