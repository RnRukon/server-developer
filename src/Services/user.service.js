const bcrypt = require('bcryptjs');
const User = require("../Models/user.model");


exports.registrationService = async (userInfo) => {

    const hashedPassword = await bcrypt.hash(userInfo.password, 10);
    let newUser = await new User({ ...userInfo });
    newUser.password = hashedPassword;
    newUser.role = userInfo.role;
    const user = await User.create(newUser);
    return user;
};


exports.loginService = async (userInfo) => {

};


exports.findByEmailUserService = async (email) => {
    const user = await User.findOne({ email });
    return user;
};


exports.getAllUserService = async (filters, queries) => {

    const users = await User.find(filters)
        .skip(queries.skip)
        .limit(queries.limit);


    const total = await User.countDocuments(filters);
    const page = Math.ceil(total / queries.limit);
    return { total, page, users };
};

exports.getSingleUserService = async (id) => {
    const user = await User.findById({ _id: id });
    return user;
};


exports.updateProfileService = async (email, data) => {
    const user = await User.findOneAndUpdate({ email },
        data,
        {
            runValidators: true
        });
    return user;
};

exports.makeAdminService = async (email) => {
    const user = await User.findOneAndUpdate({ email },
        { role: 'user' },
        {
            runValidators: true
        });
    return user;
};


