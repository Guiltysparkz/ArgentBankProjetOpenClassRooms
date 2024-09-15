const mongoose = require('mongoose');
const Account = require('../database/models/accountModel');

module.exports.createAccount = async (userId, accountData) => {
  try {
    const objectId = mongoose.Types.ObjectId(userId);

    console.log(
      'Account data received in service:',
      JSON.stringify(accountData, null, 2)
    );

    const newAccount = new Account({
      accountID: objectId,
      ...accountData,
    });

    console.log(
      'New Account object before saving:',
      JSON.stringify(newAccount, null, 2)
    );

    let result = await newAccount.save();

    console.log('Saved Account result:', JSON.stringify(result, null, 2));

    return result.toObject();
  } catch (error) {
    console.error('Error in createAccount.js', error);
    throw new Error(error.message);
  }
};

module.exports.getAccounts = async (userId) => {
  try {
    const objectId = mongoose.Types.ObjectId(userId);
    console.log('Searching for account with accountID:', objectId);

    const account = await Account.findOne({ accountID: objectId });
    console.log('Account found:', JSON.stringify(account, null, 2));

    if (!account) {
      throw new Error('Account not found!');
    }

    const accountObject = account.toObject();
    console.log(
      'Account after toObject():',
      JSON.stringify(accountObject, null, 2)
    );

    return accountObject;
  } catch (error) {
    console.error('Error in getAccounts.js', error);
    throw new Error(error.message);
  }
};

module.exports.updateTransactionDetail = async (userId, transactionData) => {
  try {
    const objectId = mongoose.Types.ObjectId(userId);

    const account = await Account.findOneAndUpdate(
      { accountID: objectId },
      {
        $set: {
          'transactions.$[elem].transactionCategory':
            transactionData.transactionCategory,
          'transactions.$[elem].transactionNote':
            transactionData.transactionNote,
        },
      },
      {
        new: true,
        arrayFilters: [
          {
            'elem._id': mongoose.Types.ObjectId(transactionData.transactionId),
          },
        ],
      }
    );

    if (!account) {
      throw new Error('Account not found!');
    }

    return account.toObject();
  } catch (error) {
    console.error('Error in updateTransactionDetail.js', error);
    throw new Error(error.message);
  }
};
