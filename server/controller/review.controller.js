const Review = require('../models/review.model');

const createReview = (req, res, _next) => {
  try {
  } catch (err) {
    console.log(err.message);
    return res.status(404).json({
      success: false,
      status: 404,
      message: err.message,
    });
  }
};

const getAllReviews = (req, res, _next) => {
  try {
  } catch (err) {
    console.log(err.message);
    return res.status(404).json({
      success: false,
      status: 404,
      message: err.message,
    });
  }
};

const updateReviewById = (req, res, _next) => {
  try {
  } catch (err) {
    console.log(err.message);
    return res.status(404).json({
      success: false,
      status: 404,
      message: err.message,
    });
  }
};

const deleteReview = (req, res, _next) => {
  try {
  } catch (err) {
    console.log(err.message);
    return res.status(404).json({
      success: false,
      status: 404,
      message: err.message,
    });
  }
};
module.exports = {
  createReview,
  getAllReviews,
  deleteReview,
  updateReviewById,
};
