// cleanupDatabase.js
const mongoose = require('mongoose');
const User = require('../database/models/userModel');
const Account = require('../database/models/accountModel');

mongoose.connect('mongodb://localhost/argentBankDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const cleanup = async () => {
  try {
    await User.deleteMany({});
    console.log('All users deleted.');

    await Account.deleteMany({});
    console.log('All accounts deleted.');

    mongoose.connection.close();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Error during cleanup:', error);
    mongoose.connection.close();
  }
};

cleanup();
