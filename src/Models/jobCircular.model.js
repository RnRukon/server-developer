const Mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = Mongoose.Schema.Types;


const jobCircularSchema = Mongoose.Schema({
    jobTitle: {
        type: String,
        require: [true, "Job Title is required"],
        trim: true,
    },
    email: {
        type: String,
        require: true,
        trim: true,
        validate: [validator.isEmail, "Provide a valid Email"],
    },
    jobType: {
        type: String,
        require: [true, "Job type is required"],
        trim: true,
    },

    responsibilities: {
        type: String,
        require: [true, "Responsibilities is required"],
    },

    skills: {
        type: String,
        require: [true, "Requirements is required"],

    },
    salaryRange: {
        type: String,
    },
    candidates: [
        {
            type: ObjectId,
            ref: "User"
        }
    ],
    jobLocation: String,
    description: String,
    company: {
        type: ObjectId,
        require: true,
        ref: 'User'
    }
},
    {
        timestamps: true,
    }
);


const Circular = Mongoose.model('Circular', jobCircularSchema);

module.exports = Circular;