const express = require('express');
const router = express.Router();
const controller = require('../controller/order.controller');

router.post('/place', controller.createOrder);
router.get('/user/:id', controller.getOrdersByUserOrSellerId);
router.get('/:id', controller.getOrderById);
router.put('/:id', controller.alotSeller);
router.put('/review/:id', controller.reviewAdding);

module.exports = router;
