const Review = require('../models/review.model');

const createReview = async (req, res, _next) => {
  try {
    const { body } = req;
    if (!body) throw new Error('Please attach the body');
    const review = new Review(body);
    const result = await review.save();
    if (!result) throw new Error('Unable to save the review');
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Review added',
      id: result._id,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(404).json({
      success: false,
      status: 404,
      message: err.message,
    });
  }
};

const getAllReviews = async (req, res, _next) => {
  try {
    const result = await Review.find();
    if (!result) throw new Error('No review found');
    return res.status(200).json({
      success: true,
      status: 200,
      ids: result.map(r => r._id),
      message: 'Review found',
    });
  } catch (err) {
    console.log(err.message);
    return res.status(404).json({
      success: false,
      status: 404,
      message: err.message,
    });
  }
};

const updateReviewById = async (req, res, _next) => {
  try {
    const { body } = req;
    if (!body) throw new Error('Please attach the body');
    const toUpdate = await Review.find({ _id: req.params.id });
    if (!toUpdate) throw new Error('No such review found');
    toUpdate = body;
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Review updated',
    });
  } catch (err) {
    console.log(err.message);
    return res.status(404).json({
      success: false,
      status: 404,
      message: err.message,
    });
  }
};

const deleteReview = async (req, res, _next) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error('Please attach the Id to path');
    const deletedReview = await Review.findOneAndDelete({ _id: id });
    console.log(deletedReview);
    if (!deletedReview) throw new Error('No such user exsits');
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Review Deleted',
    });
  } catch (err) {
    console.log(err.message);
    return res.status(404).json({
      success: false,
      status: 404,
      message: err.message,
    });
  }
};

const getReviewsByProduct = async (req, res, _next) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error('Please provide the id here');

    const result = await Review.find({ products: id });
    if (!result) throw new Error('No review found');
    return res.status(200).json({
      success: true,
      status: 200,
      reviews: result,
      message: 'Review found',
    });
  } catch (err) {
    console.log(err.message);
    return res.status(404).json({
      success: false,
      status: 404,
      message: err.message,
    });
  }
};

const getReviewsByUser = async (req, res, _next) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error('Please provide the id here');

    const result = await Review.find({ users: id });
    if (!result) throw new Error('No review found');
    return res.status(200).json({
      success: true,
      status: 200,
      reviews: result,
      message: 'Review found',
    });
  } catch (err) {
    console.log(err.message);
    return res.status(404).json({
      success: false,
      status: 404,
      message: err.message,
    });
  }
};

const getReviewByOrder = async (req, res, _next) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error('Please provide the id here');

    const result = await Review.findOne({ orders: id });
    if (!result) throw new Error('No review found');
    return res.status(200).json({
      success: true,
      status: 200,
      orderReview: result,
      message: 'Review found',
    });
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
  getReviewsByProduct,
  getReviewsByUser,
  getReviewByOrder,
};
