const bcrypt = require("bcryptjs");
const User = require("../Models/user.model");
const { registrationService, findByEmailUserService, updateProfileService, getAllUserService, getSingleUserService, makeAdminService } = require("../Services/user.service");
const { generateToken } = require("../utils/token");

exports.registration = async (req, res) => {
    try {

        const findUser = await findByEmailUserService(req.body.email);

        if (findUser) {
            return req.status(200).json({
                status: "success",
                message: 'You are already Registered, please login'
            })
        }

        const user = await registrationService(req.body);
        res.status(200).json({
            result: user,
            status: "success",
            message: "Signup Successfully",
        });



    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: 'Server error, please try ageing'
        });
    }
};
exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({
                status: "fail",
                message: 'Please provide email and password'
            })
        }

        const findUser = await findByEmailUserService(email);

        if (!findUser) {
            return res.status(401).json({
                status: "fail",
                message: 'You are not Registered,Please before do you Register then doing login'
            })
        }
        const isValidPassword = bcrypt.compareSync(password, findUser.password);

        if (!isValidPassword) {
            return res.status(403).json({
                status: "Fail",
                message: "Password is incorrect",
            });
        }

        const token = generateToken(findUser);

        res.status(200).json({
            token,
            user: findUser,
            status: "Success",
            message: "Signin Successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: 'Server error, please try ageing'
        });
    }
};

exports.getMe = async (req, res) => {
    try {


        const findUser = await findByEmailUserService(req.user.email);


        res.status(200).json({
            result: {
                user: findUser,

            },
            status: "success",
            message: "Get me Successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: 'Server error, please try ageing'
        });
    }
};

exports.updateProfile = async (req, res) => {
    try {
      
        const user = await updateProfileService(req.user.email, req.body);

        res.status(200).json({
            result: user,
            status: "success",
            message: "Update Profile Successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: 'Server error, please try ageing'
        });
    }
};

exports.getAllUser = async (req, res) => {
    try {
        const queries = {};
        const filter = { ...req.query };

        const excludeFields = ['sort', 'page', 'limit']
        excludeFields.forEach(field => delete filter[field])



        if (req.query.page) {
            const { page = 1, limit = 10 } = req.query;
            const skip = (page - 1) * parseInt(limit);
            queries.skip = skip;
            queries.limit = parseInt(limit);
        }



        const users = await getAllUserService(filter, queries);


        res.status(200).json({
            result: users,
            status: "success",
            message: "Get all User Successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: 'Server error, please try ageing'
        });
    }
};


exports.getSingleUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await getSingleUserService(id);
        res.status(200).json({
            result: user,
            status: "success",
            message: "Get all User Successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: 'Server error, please try ageing'
        });
    }
};

exports.makeAdmin = async (req, res) => {
    try {
        const email = req.body.email;

        const findUser = await User.findOne({ email: email });
        if (!findUser) {
            return res.status(404).json({
                status: "fail",
                error: 'This Email is not user'
            });
        }

        const user = await makeAdminService(email);
        res.status(200).json({
            result: {
                user: user,

            },
            status: "success",
            message: "Make Admin is Successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: 'Server error, please try ageing'
        });
    }
};
