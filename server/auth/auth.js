const jwt = require('jsonwebtoken');
require('dotenv').config('../.env');

exports.generateAuthToken = data => {
  return jwt.sign(data, process.env.TOKEN_SECRET);
};

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null)
    return res.status(404).json({
      success: false,
      status: 404,
      message: 'Auth failed, Token not found',
    });

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err)
      return res.status(404).json({
        success: false,
        status: 404,
        message: 'Authentication failed',
      });

    req.user = user;

    next();
  });
};
