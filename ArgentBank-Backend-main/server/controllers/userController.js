const userService = require('../services/userService');
const jwt = require('jsonwebtoken');

module.exports.createUser = async (req, res) => {
  let response = {};

  try {
    const responseFromService = await userService.createUser(req.body);
    response.status = 200;
    response.message = 'User successfully created';
    response.body = responseFromService;
  } catch (error) {
    console.error('Something went wrong in userController.js', error);
    response.status = 400;
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.loginUser = async (req, res) => {
  let response = {};

  try {
    const user = await userService.loginUser(req.body);

    // Generate JWT and set cookie
    const token = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY || 'default-secret-key',
      { expiresIn: '1h' }
    );

    // Set HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // Use true if HTTPS
    });

    // Include userName and other details in the response
    res.status(200).send({
      status: 200,
      message: 'Login Successful',
      body: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName, // Make sure to include userName
      },
    });
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: error.message,
    });
  }
};

module.exports.getUserProfile = async (req, res) => {
  let response = {};

  try {
    const userId = req.user.id;

    const userObject = await userService.getUserProfile(userId);

    response.status = 200;
    response.message = 'Successfully retrieved user profile data';
    response.body = {
      firstName: userObject.firstName,
      lastName: userObject.lastName,
      userName: userObject.userName,
    };
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    response.status = 401; // Unauthorized
    response.message = 'Unauthorized';
  }

  return res.status(response.status).send(response);
};

module.exports.updateUserProfile = async (req, res) => {
  let response = {};

  try {
    const userId = req.user.id;
    const userObject = await userService.updateUserProfile(userId, req.body);
    response.status = 200;
    response.message = 'Successfully updated user profile data';
    response.body = {
      userName: userObject.userName,
    };
  } catch (error) {
    console.log('Error in updateUserProfile - userController.js', error);
    response.status = 400;
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.logoutUser = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });
  res.status(200).send({ message: 'User successfully logged out' });
};
