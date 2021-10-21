const { generateAuthToken } = require('../auth/auth');
const User = require('../models/user.model');

const createUser = async (req, res, _next) => {
  try {
    const { body } = req;

    if (!body) throw new Error('Please attach the body');
    let user = new User(body);
    user.password = user.setPassword(body.password);
    if (!user)
      throw new Error(
        "We're unable to create your profile, please try again later"
      );
    const data = await user.save();
    if (!data)
      throw new Error(
        'Unable to create a profile for now, please try again later'
      );

    return res.status(200).json({
      success: true,
      status: 200,
      message: 'User created!',
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

const getUsers = async (req, res, _next) => {
  try {
    const users = await User.find();
    if (!users.length) throw new Error('No user found');
    return res.status(200).json({
      success: true,
      status: 200,
      body: users,
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

const getUserLogin = async (req, res, _next) => {
  try {
    const { email, password } = req.query;
    if (!email || !password)
      throw new Error('Please provide the email and passowrd');

    let user = await User.findOne({
      email,
    });
    if (!user) throw new Error('No user found');

    if (!user.validPassword(password, user.password))
      throw new Error('Invalid Password');

    const token = generateAuthToken(JSON.stringify(user));
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'User logged In',
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

const getUserById = async (req, res, _next) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error('Please provide the email and passowrd');
    const user = await User.findOne({
      _id: id,
    });
    if (!user) throw new Error('no user found');
    return res.status(200).json({
      success: true,
      status: 200,
      body: user,
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

const deleteUserById = async (req, res, _next) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error('Please attach the Id to path');
    const deletedUser = await User.findOneAndDelete({ _id: id });
    console.log(deletedUser);
    if (!deletedUser) throw new Error('No such user exsits');
    return res.status(200).json({
      success: true,
      status: 200,
      body: deletedUser,
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

const updateUserInfoById = async (req, res, _next) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error('please attach the user id');
    if (!req.body) throw new Error('Please attach the body');

    const { firstName, lastName, cnic, phoneNumber, address } = req.body;

    const user = await User.findOne({ _id: id });
    if (!user) throw new Error('User not found');

    user.firstName = firstName;
    user.lastName = lastName;
    user.cnic = cnic;
    user.phoneNumber = phoneNumber;
    user.address = address;

    const updatedUser = await user.save();
    if (!updatedUser)
      throw new Error('Unable to update the record, please try again later');
    return res.status(200).json({
      success: true,
      status: 200,
      body: updatedUser,
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
  createUser,
  getUsers,
  getUserLogin,
  getUserById,
  deleteUserById,
  updateUserInfoById,
};
