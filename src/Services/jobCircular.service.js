const Circular = require("../Models/jobCircular.model");
const User = require("../Models/user.model");



exports.postJobCircularService = async (jobCircularData) => {
    const data = await Circular.create(jobCircularData);
    return data;
};

exports.getJobCircularService = async () => {
    const data = await Circular.find({})
        .populate("company");
    return data;
};

exports.getSingleJobCircularService = async (id) => {
    const data = await Circular.findOne({ _id: id })
        .populate(['company', 'candidates']);
    return data;
};
exports.getMyJobCircularService = async (email) => {
    const data = await Circular.find({ email: email })
        .populate('company');
    return data;
};



exports.deleteJobCircularService = async (id) => {
    const data = await Circular.deleteOne({ _id: id });
    return data;
};


exports.updateJobCircularService = async (id, updateData) => {
    const data = await Circular.updateOne(
        { _id: id },
        updateData,
        { runValidators: true });
    return data;
};
exports.applyService = async ({ email, id }) => {

    const user = await User.findOne({ email });
    const userId = await user?._id;



    const candidates = await Circular.updateOne({
        _id: id
    },
        {
            $push: {
                candidates: userId
            }
        }
    )





    return candidates;
};