// tokenValidation.js
const jwt = require('jsonwebtoken');

module.exports.validateToken = (req, res, next) => {
  try {
    if (!req.cookies || !req.cookies.token) {
      throw new Error('Token is missing from cookies');
    }

    const userToken = req.cookies.token;
    const decodedToken = jwt.verify(
      userToken,
      process.env.SECRET_KEY || 'default-secret-key'
    );

    console.log('Decoded token:', decodedToken);

    req.user = decodedToken;

    return next();
  } catch (error) {
    console.error('Error in tokenValidation.js:', error);
    return res.status(401).send({
      status: 401,
      message: 'Unauthorized',
    });
  }
};
