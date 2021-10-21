const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Order = new Schema(
  {
    userId: { type: String, required: true },
    sellerId: { type: String, required: true },
    productId: { type: String, required: true },
    latitude: { type: Number, required: true },
    logitude: { type: Number, required: true },
    address: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    budget: { type: Number, required: true },
    review: { type: String },
    status: { type: String, default: 'pending' }, //InProgress Cancelled, Completed
    description: { type: String },
    deliveryDate: { type: Date },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('orders', Order);
