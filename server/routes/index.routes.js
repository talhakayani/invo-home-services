const userRoute = require('./user.routes');
const sellerRoute = require('./seller.routes');
const serviceRoute = require('./services.routes');
const reviewRoute = require('./review.routes');
const productRoute = require('./product.routes');
const orderRoute = require('./order.routes');
const express = require('express');
const router = express.Router();

router.use('/user', userRoute);
router.use('/seller', sellerRoute);
router.use('/service', serviceRoute);
router.use('/review', reviewRoute);
router.use('/product', productRoute);
router.use('/order', orderRoute);

module.exports = router;
