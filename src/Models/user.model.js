const Mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = Mongoose.Schema.Types;

const userSchema = Mongoose.Schema({
    fname: {
        type: String,
        trim: true,
    },
    lname: {
        type: String,
        trim: true,
    },
    photo: String,
    companyName: String,
    gender: {
        type: String,
        enum: ['Mail', 'female', 'intersex'],
        trim: true,
    },

    contactNo: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        trim: true,
        validate: [validator.isEmail, "Provide a valid Email"],
        unique: [true, "Email is must be unique"],
    },
    bio: {
        type: String,
        trim: true,
    },
    developerLaval: {
        type: String,
        enum: ['Junior', 'Mid', "Senior"]
    },
    positionType: {
        type: String,
        trim: true,
    },
    experienceCompany: {
        type: String,
        trim: true,
    },
    experiencePosition: {
        type: String,
        trim: true,
    },
    institute: {
        type: String,
        trim: true,
    },
    companyAddress: {
        type: String,
        trim: true,
    },
    companyType: {
        type: String,
        trim: true,
    },
    companyWebSide: {
        type: String,
        trim: true,
    },
    companyDescription: {
        type: String,
        trim: true,
    },
    currentAddress: {
        type: String,
        trim: true,
    },
    permanentAddress: {
        type: String,
        trim: true,
    },
    qualification: {
        type: String,
        trim: true,
    },
    dateOfBirth: {
        type: String,
        trim: true,
    },
    resume: {
        type: String,
        trim: true,
    },
    portfolio: {
        type: String,
        trim: true,
    },
    github: {
        type: String,
        trim: true,
    },
    linkedin: {
        type: String,
        trim: true,
    },

    role: {
        type: String,
        default: 'user',
        enum: ["user", "admin", "company"],
    },
    status: {
        type: String,
        default: "active",
        enum: ["active", "inactive", "blocked"],
    },
    password: {
        type: String,
        require: [true, "Password is require"]
    },
},
    {
        timestamps: true,
    }
);


const User = Mongoose.model('User', userSchema);

module.exports = User;