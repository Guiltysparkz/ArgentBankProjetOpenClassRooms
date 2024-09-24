const mongoose = require('mongoose');
const accountService = require('../services/accountService');
const Account = require('../database/models/accountModel'); // Replace with the correct path to your Account model

module.exports.createAccount = async (req, res) => {
  let response = {};

  try {
    const userId = req.user.id;
    const accountData = req.body;

    console.log(
      'Account data received in controller:',
      JSON.stringify(accountData, null, 2)
    );

    const responseFromService = await accountService.createAccount(
      userId,
      accountData
    );

    response.status = 200;
    response.message = 'Account successfully created';
    response.body = responseFromService;
  } catch (error) {
    console.error('Error in createAccount - accountController.js', error);
    response.status = 400;
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.getAccounts = async (req, res) => {
  let response = {};

  try {
    const userId = req.user.id;
    console.log('User ID in getAccounts:', userId);

    const responseFromService = await accountService.getAccounts(userId);

    response.status = 200;
    response.message = 'Successfully retrieved accounts';
    response.body = responseFromService;
  } catch (error) {
    console.error('Error in getAccounts - accountController.js', error);
    response.status = 400;
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.updateTransactionDetail = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from token middleware
    const {
      accountField,
      transactionId,
      transactionCategory,
      transactionNote,
    } = req.body;

    // Call the service to handle the update logic
    const updatedAccount = await accountService.updateTransactionDetail({
      userId,
      accountField,
      transactionId,
      transactionCategory,
      transactionNote,
    });

    if (!updatedAccount) {
      return res.status(404).json({ message: 'Account not found' });
    }

    return res
      .status(200)
      .json({ message: 'Transaction updated', account: updatedAccount });
  } catch (error) {
    console.error('Error updating transaction:', error);
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};
