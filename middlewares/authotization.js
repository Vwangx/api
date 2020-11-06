const jwt = require('jsonwebtoken');

const User = require('../models/User');

const { JWT_SECRET } = process.env;

module.exports = async (req, res, next) => {
  let { authorization: authToken } = req.headers;

  if (authToken) {
    authToken = authToken.replace('Bearer', '').trim();
    try {
      const { data: id } = jwt.verify(authToken, JWT_SECRET);
      const user = await User.findById(id).select('-password');
      if (user) req.user = user;
    } catch (err) {
      console.error('Authorization middleware error:', err.message);
    }
  }
  return next();
};
