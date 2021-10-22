const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Review = new Schema(
  {
    users: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    orders: { type: mongoose.Schema.Types.ObjectId, ref: 'orders' },
    sellers: { type: mongoose.Schema.Types.ObjectId, ref: 'sellers' },
    products: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
    reviewDescription: { type: String, required: false },
    reviewRating: { type: Number, required: true },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model('reviews', Review);
