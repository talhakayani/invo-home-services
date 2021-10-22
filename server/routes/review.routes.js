const express = require('express');
const router = express.Router();
const controller = require('../controller/review.controller');

router.get('/', controller.getAllReviews);
router.post('/addReview', controller.createReview);
router.delete('/:id', controller.deleteReview);
router.put('/:id', controller.updateReviewById);
router.get('/product/:id', controller.getReviewsByProduct);
router.get('/user/:id', controller.getReviewsByUser);
router.get('/order/:id', controller.getReviewByOrder);

module.exports = router;
