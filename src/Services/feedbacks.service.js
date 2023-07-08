const Feedback = require("../Models/feedbacks.model");



exports.postFeedbacksService = async (massage) => {
    const data = await Feedback.create(massage);
    return data;
};
exports.getFeedbacksService = async () => {
    const data = await Feedback.find({}).sort('-createdAt');
    return data;
};