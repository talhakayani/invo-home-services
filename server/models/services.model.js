const mongooes = require('mongoose');

const Schema = mongooes.Schema;

const Service = new Schema(
  {
    category: { type: String, required: true, unique: true },
    subCategory: { type: String, required: true, unique: true },
    products: [{ type: mongooes.Schema.Types.ObjectId, ref: 'products' }],
  },
  {
    timestamps: false,
  }
);

module.exports = mongooes.model('services', Service);
