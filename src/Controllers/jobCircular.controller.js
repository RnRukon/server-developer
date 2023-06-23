const Circular = require("../Models/jobCircular.model");
const { postJobCircularService, getJobCircularService, getMyJobCircularService, getSingleJobCircularService, deleteJobCircularService, updateJobCircularService, applyService } = require("../Services/jobCircular.service");
const { findByEmailUserService } = require("../Services/user.service");




exports.postJobCircular = async (req, res) => {
    try {

        const findUser = await findByEmailUserService(req.user.email);
        const newData = { ...req.body, company: findUser._id, email: findUser.email };
        const JobCircular = await postJobCircularService(newData);

        res.status(200).json({
            result: JobCircular,
            status: "success",
            message: "Job Circular post is Successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: 'Server error, please try ageing'
        });
    }
};



exports.getMyJobCircular = async (req, res) => {


    try {
        const circular = await getMyJobCircularService(req.user.email);
        res.status(200).json({
            result: circular,
            status: "success",
            message: "Get circular is Successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: 'Server error, please try ageing'
        });
    }
};
exports.getJobCircular = async (req, res) => {
    try {
        const circular = await getJobCircularService();
        res.status(200).json({
            result: circular,
            status: "success",
            message: "Get circular is Successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: 'Server error, please try ageing'
        });
    }
};

exports.getSingleJobCircular = async (req, res) => {
    try {
        const circular = await getSingleJobCircularService(req.params.id)


        res.status(200).json({
            result: circular,
            status: "success",
            message: "Get circular is Successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: 'Server error, please try ageing'
        });
    }
};


exports.updateJobCircular = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const circular = await updateJobCircularService(id, updateData);

        res.status(200).json({
            result: circular,
            status: "success",
            message: "Circular is updated",
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: 'Server error, please try ageing'
        });
    }
};
exports.deleteJobCircular = async (req, res) => {
    try {
        const { id } = req.params;
        const circular = await deleteJobCircularService(id);

        res.status(200).json({
            result: circular,
            status: "success",
            message: "Delete is Successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: 'Server error, please try ageing'
        });
    }
};
exports.apply = async (req, res) => {
    try {
        const { id } = req.params;
        const email = req.user.email;


        const circulars = await Circular.findOne({ _id: id })
            .populate(['company','candidates'])

        const exist = await circulars?.candidates?.find((data) => data.email === email);

        if (exist) {
            return res.status(200).json({
                status: "fail",
                message: "You are already apply",
            });
        }


        const circular = await applyService({ email, id });

        res.status(200).json({
            result: circular,
            status: "success",
            message: "Apply is Successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: 'Server error, please try ageing'
        });
    }
}; 