const express = require('express');
const { authenticateToken } = require('../auth/auth');
const router = express.Router();
const controller = require('../controller/service.controller');

router.get('/', controller.getServices);
router.post('/addService', controller.createService);

module.exports = router;
