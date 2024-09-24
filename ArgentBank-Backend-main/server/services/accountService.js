const mongoose = require('mongoose');
const Account = require('../database/models/accountModel');

module.exports.createAccount = async (userId, accountData) => {
  try {
    // Ensure userId is a string before converting to ObjectId
    const userIdObject = new mongoose.Types.ObjectId(userId.toString());

    const newAccount = new Account({
      accountID: userIdObject,
      ...accountData,
    });

    let result = await newAccount.save();

    return result.toObject();
  } catch (error) {
    console.error('Error in createAccount:', error);
    throw new Error(error.message);
  }
};

module.exports.getAccounts = async (userId) => {
  try {
    // Ensure userId is a string before converting to ObjectId
    const userIdObject = new mongoose.Types.ObjectId(userId.toString());

    const account = await Account.findOne({ accountID: userIdObject });

    if (!account) {
      throw new Error('Account not found!');
    }

    return account.toObject();
  } catch (error) {
    console.error('Error in getAccounts:', error);
    throw new Error(error.message);
  }
};

module.exports.updateTransactionDetail = async (transactionData) => {
  try {
    const {
      userId,
      accountField,
      transactionId,
      transactionCategory,
      transactionNote,
    } = transactionData;

    // Add logging to check if the data is received correctly
    console.log('Received userId:', userId);
    console.log('Received transactionId:', transactionId);
    console.log('Received accountField:', accountField);
    console.log('Received transactionCategory:', transactionCategory);
    console.log('Received transactionNote:', transactionNote);

    const transactionsPath = `${accountField}.transactions`;

    console.log('Transactions path:', transactionsPath);

    // Perform the update in the database
    const account = await Account.findOneAndUpdate(
      { accountID: userId }, // Use userId as a string directly
      {
        $set: {
          [`${transactionsPath}.$[elem].transactionCategory`]:
            transactionCategory,
          [`${transactionsPath}.$[elem].transactionNote`]: transactionNote,
        },
      },
      {
        new: true, // Return the updated document
        arrayFilters: [
          { 'elem._id': new mongoose.Types.ObjectId(transactionId) },
        ],
      }
    );

    if (!account) {
      throw new Error('Account not found');
    }

    // Log to ensure the update was successful
    console.log('Updated account:', JSON.stringify(account, null, 2));

    return account.toObject(); // Return the updated account as a plain object
  } catch (error) {
    console.error('Error in updateTransactionDetail:', error);
    throw new Error(error.message);
  }
};
