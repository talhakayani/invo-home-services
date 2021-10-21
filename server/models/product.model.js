const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 500 },
    picture: { type: String, required: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'reviews' }],
  },
  {
    timestamps: false,
  }
);
module.exports = mongoose.model('products', Product);
