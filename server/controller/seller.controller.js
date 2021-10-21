const { generateAuthToken } = require('../auth/auth');
const Seller = require('../models/seller.model');

const createSeller = async (req, res, _next) => {
  try {
    const { body } = req;

    if (!body) throw new Error('Please attach the body');
    let seller = new Seller(body);
    seller.password = seller.setPassword(body.password);
    if (!seller)
      throw new Error(
        "We're unable to create your profile, please try again later"
      );
    const data = await seller.save();
    if (!data)
      throw new Error(
        'Unable to create a profile for now, please try again later'
      );

    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Seller created!',
      id: data,
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

const getSellerLogin = async (req, res, _next) => {
  try {
    const { email, password } = req.query;
    if (!email || !password)
      throw new Error('Please provide the email and passowrd');

    let seller = await Seller.findOne({
      email,
    });
    if (!seller) throw new Error('No seller found');

    if (!seller.validPassword(password, seller.password))
      throw new Error('Invalid Password');

    const token = generateAuthToken(JSON.stringify(seller));
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'seller logged In',
      token,
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

const getSellers = async (req, res, _next) => {
  try {
    const sellers = await Seller.find();
    if (!sellers.length) throw new Error('No seller found');
    return res.status(200).json({
      success: true,
      status: 200,
      body: sellers,
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

const getSellerById = async (req, res, _next) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error('Please provide the email and passowrd');
    const seller = await Seller.findOne({
      _id: id,
    });
    if (!seller) throw new Error('no seller found');
    return res.status(200).json({
      success: true,
      status: 200,
      body: seller,
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

const deleteSellerById = async (req, res, _next) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error('Please attach the Id to path');
    const deletedSeller = await Seller.findOneAndDelete({ _id: id });

    if (!deletedSeller) throw new Error('No such seller exsits');
    return res.status(200).json({
      success: true,
      status: 200,
      body: deletedSeller,
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

const updateSellerInfoById = async (req, res, _next) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error('please attach the seller id');
    if (!req.body) throw new Error('Please attach the body');

    const { firstName, lastName, cnic, phoneNumber, address } = req.body;

    const seller = await Seller.findOne({ _id: id });
    if (!seller) throw new Error('seller not found');

    seller.firstName = firstName;
    seller.lastName = lastName;
    seller.cnic = cnic;
    seller.phoneNumber = phoneNumber;
    seller.address = address;

    const updatedseller = await seller.save();
    if (!updatedseller)
      throw new Error('Unable to update the record, please try again later');
    return res.status(200).json({
      success: true,
      status: 200,
      body: updatedseller,
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
  createSeller,
  getSellerLogin,
  getSellers,
  getSellerById,
  deleteSellerById,
  updateSellerInfoById,
};
