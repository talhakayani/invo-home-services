const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Order = new Schema(
  {
    users: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    sellers: { type: mongoose.Schema.Types.ObjectId, ref: 'sellers' },
    products: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
      required: true,
    },
    latitude: { type: Number, required: true },
    logitude: { type: Number, required: true },
    address: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    budget: { type: Number, required: true },
    reviews: { type: mongoose.Schema.Types.ObjectId, ref: 'reviews' },
    status: { type: String, default: 'pending' }, //InProgress Cancelled, Completed
    description: { type: String },
    deliveryDate: { type: Date },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('orders', Order);
