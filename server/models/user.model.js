const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const User = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    cnic: { type: String, required: true, unique: true },
    phoneNumber: { type: String, unique: true },
    phoneNumberVerified: { type: Boolean, default: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
  },
  {
    timestamps: true,
  }
);

User.methods.setPassword = password => {
  const salt = crypto.randomBytes(16).toString('hex');

  const pass = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return salt + '|' + pass;
};
User.methods.validPassword = (password, hashed) => {
  const hash_pass = hashed.split('|');
  var hash = crypto
    .pbkdf2Sync(password, hash_pass[0], 1000, 64, `sha512`)
    .toString(`hex`);
  return hash_pass[1] === hash;
};

module.exports = mongoose.model('users', User);
