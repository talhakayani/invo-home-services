const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

const Seller = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    cnic: { type: String, required: true, unique: true },
    phoneNumber: { type: String, unique: true },
    phoneNumberVerified: { type: Boolean, default: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
Seller.methods.setPassword = password => {
  const salt = crypto.randomBytes(16).toString('hex');

  const pass = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return salt + '|' + pass;
};
Seller.methods.validPassword = (password, hashed) => {
  const hash_pass = hashed.split('|');
  var hash = crypto
    .pbkdf2Sync(password, hash_pass[0], 1000, 64, `sha512`)
    .toString(`hex`);
  return hash_pass[1] === hash;
};
module.exports = mongoose.model('sellers', Seller);
