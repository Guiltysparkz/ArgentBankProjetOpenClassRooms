const User = require('../database/models/userModel');
const bcrypt = require('bcrypt');

module.exports.createUser = async (serviceData) => {
  console.log(serviceData);
  try {
    const user = await User.findOne({ email: serviceData.email });
    if (user) {
      throw new Error('Email already exists');
    }

    const hashPassword = await bcrypt.hash(serviceData.password, 12);

    const newUser = new User({
      email: serviceData.email,
      password: hashPassword,
      firstName: serviceData.firstName,
      lastName: serviceData.lastName,
      userName: serviceData.userName,
    });
    console.log(newUser);
    let result = await newUser.save();

    return result;
  } catch (error) {
    console.error('Error in userService.js', error);
    throw new Error(error);
  }
};

module.exports.getUserProfile = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found!');
    }

    return user.toObject();
  } catch (error) {
    console.error('Error in userService.js:', error);
    throw new Error(error.message);
  }
};

module.exports.loginUser = async (serviceData) => {
  try {
    const user = await User.findOne({ email: serviceData.email });

    if (!user) {
      throw new Error('User not found!');
    }

    const isValid = await bcrypt.compare(serviceData.password, user.password);

    if (!isValid) {
      throw new Error('Password is invalid');
    }

    const userData = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
    };

    return userData;
  } catch (error) {
    console.error('Error in userService.js', error);
    throw new Error(error);
  }
};

module.exports.updateUserProfile = async (userId, updateData) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found!');
    }

    // Update the user's userName
    user.userName = updateData.userName || user.userName;
    await user.save();

    return user.toObject();
  } catch (error) {
    console.error('Error in userService.js', error);
    throw new Error(error.message);
  }
};
