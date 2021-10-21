const express = require('express');
const { authenticateToken } = require('../auth/auth');
const controller = require('../controller/user.controller');

const router = express.Router();

router.get('/', controller.getUsers);
router.get('/login', controller.getUserLogin);
router.post('/signup', controller.createUser);
router.get('/:id', authenticateToken, controller.getUserById);
router.delete('/:id', authenticateToken, controller.deleteUserById);
router.put('/:id', authenticateToken, controller.updateUserInfoById);

module.exports = router;
