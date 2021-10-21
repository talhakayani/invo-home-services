const controller = require('../controller/seller.controller');

const express = require('express');
const { authenticateToken } = require('../auth/auth');

const router = express.Router();

router.get('/', controller.getSellers);
router.get('/login', controller.getSellerLogin);
router.post('/signin', controller.createSeller);
router.delete('/:id', authenticateToken, controller.deleteSellerById);
router.get('/:id', authenticateToken, controller.getSellerById);
router.put('/:id', authenticateToken, controller.updateSellerInfoById);
module.exports = router;
