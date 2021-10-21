const userRoute = require('./user.routes');
const sellerRoute = require('./seller.routes');
const serviceRoute = require('./services.routes');
const express = require('express');
const router = express.Router();

router.use('/user', userRoute);
router.use('/seller', sellerRoute);
router.use('/service', serviceRoute);
module.exports = router;
