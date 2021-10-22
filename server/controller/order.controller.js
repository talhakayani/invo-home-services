const Order = require('../models/order.model');

const createOrder = async (req, res, _next) => {
  try {
    const body = req.body;
    if (!body) throw new Error('Please attach the body');
    const order = new Order(body);
    const orderSaved = await order.save();
    if (!orderSaved) throw new Error('Order is not placed');
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Order Placed',
      order: orderSaved,
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

const updateOrderStatus = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!id) throw new Error('Please provide the id');
    const order = await Order.findOne({ _id: id });
    order.status = status;
    const orderStatusUpdated = await order.save();
    if (!orderStatusUpdated.status === status)
      throw new Error('Order status not updated');
    return res.status(200).body({
      success: true,
      status: 200,
      message: 'Order status updated',
      order: orderStatusUpdated,
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

const updatePrice = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const { budget } = req.body;
    if (!id) throw new Error('Please provide the id');
    const order = await Order.findOne({ _id: id });
    order.budget = budget;
    const orderPriceUpdated = await order.save();
    if (!orderPriceUpdated.status === budget)
      throw new Error('Order price not updated');
    return res.status(200).body({
      success: true,
      status: 200,
      message: 'Order price updated',
      order: orderPriceUpdated,
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

const getOrdersByUserOrSellerId = async (req, res, _next) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error('Please add id to params');
    const orders = await Order.find({ user_id: id })
      .populate('products')
      .populate('users')
      .populate('sellers')
      .populate('reviews');
    if (!orders) throw new Error('No order found');
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Orders found',
      orders,
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

const getOrderById = async (req, res, _next) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error('Please provide the id');
    const order = await Order.findOne({ _id: id }).populate('users');
    if (!order) throw new Error('No Order found');
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Order found',
      order,
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

const alotSeller = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const { sellerId } = req.body;
    if (!id) throw new Error('Please add the id here in the path');
    const order = await Order.findOne({ _id: id });
    if (!order) throw new Error('No Order Found');
    order.sellers = sellerId;
    order.status = 'In Progress';
    const alotedSeller = await order.save();
    if (!alotedSeller.sellers) throw new Error('Unable to alot the seller');
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Seller Aloted',
      orderUpdate: alotedSeller,
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

const reviewAdding = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const { reviewId } = req.body;
    if (!id) throw new Error('Please add the id here in the path');
    const order = await Order.findOne({ _id: id });
    if (!order) throw new Error('No Order Found');
    order.reviews = reviewId;
    console.log(order.reviews);
    order.status = 'Completed';
    const alotedSeller = await order.save();
    if (!alotedSeller.sellers) throw new Error('Unable to add your review');
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Review added',
      orderUpdate: alotedSeller,
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

/**
 * try {
  } catch (err) {
    console.log(err.message);
    return res.status(404).json({
      success: false,
      status: 404,
      message: err.message,
    });
  }
 */

module.exports = {
  createOrder,
  updateOrderStatus,
  updatePrice,
  getOrdersByUserOrSellerId,
  getOrderById,
  alotSeller,
  reviewAdding,
};
