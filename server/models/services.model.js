const mongooes = require('mongoose');

const Schema = mongooes.Schema;

const Service = new Schema(
  {
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    services: [{ type: mongooes.Schema.Types.ObjectId, ref: 'products' }],
  },
  {
    timestamps: false,
  }
);

module.exports = mongooes.model('services', Service);
