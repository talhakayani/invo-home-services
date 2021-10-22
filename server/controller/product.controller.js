const Product = require('../models/product.model');

const createProduct = async (req, res, _next) => {
  try {
    const { body } = req;
    if (!body) throw new Error('Please attach the body');
    const product = new Product(body);
    const result = await product.save();
    if (!result) throw new Error('Unable to save the product');
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Product added',
      id: result._id,
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

const getAllProducts = async (req, res, _next) => {
  try {
    const result = await Product.find();
    if (!result) throw new Error('No product found');
    return res.status(200).json({
      success: true,
      status: 200,
      ids: result.map(r => r._id),
      message: 'Products found',
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

const updateProductById = async (req, res, _next) => {
  try {
    const { body } = req;
    if (!body) throw new Error('Please attach the body');
    const toUpdate = await Product.find({ _id: req.params.id });
    if (!toUpdate) throw new Error('No such user found');
    toUpdate = body;
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Product updated',
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

const deleteProduct = async (req, res, _next) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error('Please attach the Id to path');
    const deletedProduct = await Product.findOneAndDelete({ _id: id });
    console.log(deletedProduct);
    if (!deletedProduct) throw new Error('No such user exsits');
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Product Deleted',
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
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProductById,
};
