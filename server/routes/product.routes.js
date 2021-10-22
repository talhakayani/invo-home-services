const express = require('express');
const router = express.Router();
const controller = require('../controller/product.controller');
router.get('/', controller.getAllProducts);
router.post('/addProduct', controller.createProduct);
router.delete('/:id', controller.deleteProduct);
router.put('/:id', controller.updateProductById);
module.exports = router;
