const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Review = new Schema(
  {
    userId: { type: String, required: true },
    orderId: { type: String, required: true },
    productId: { type: String, required: true },
    reviewDescription: { type: String, required: false },
    reviewRating: { type: Number, required: true },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model('reviews', Review);
