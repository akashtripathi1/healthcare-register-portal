const jwt = require('jsonwebtoken');
const config = require('config');

const authMiddleware = (req, res, next) => {

  // Get token from header
  // const token = req.headers.authorization?.split(' ')[1];
  // const token = req.header('x-auth-token');
  const token = req.header('Authorization')?.split(' ')[1]; // Bearer Token extraction


  // Check if not token
  if (!token) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;