const mongoose = require('mongoose');

const accountDetailsSchema = new mongoose.Schema({
  accountNumber: String,
  accountBalance: Number,
});

const transactionSchema = new mongoose.Schema({
  date: String,
  description: String,
  transactionAmount: Number,
  balanceAfterTransaction: Number,
  transactionType: String,
  transactionCategory: String,
  transactionNote: String,
});

const accountSchema = new mongoose.Schema(
  {
    accountID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    account1: {
      accountDetails: accountDetailsSchema,
      transactions: [transactionSchema],
    },
    account2: {
      accountDetails: accountDetailsSchema,
      transactions: [transactionSchema],
    },
    account3: {
      accountDetails: accountDetailsSchema,
      transactions: [transactionSchema],
    },
  },
  {
    timestamps: true,
    toObject: {
      transform: function (doc, ret) {
        // Convert _id fields to strings
        ret.id = ret._id.toString();
        delete ret._id;
        // Ensure nested transactions and details are also transformed
        if (ret.account1) {
          ret.account1.accountDetails.id =
            ret.account1.accountDetails._id.toString();
          delete ret.account1.accountDetails._id;
        }
        if (ret.account2) {
          ret.account2.accountDetails.id =
            ret.account2.accountDetails._id.toString();
          delete ret.account2.accountDetails._id;
        }
        if (ret.account3) {
          ret.account3.accountDetails.id =
            ret.account3.accountDetails._id.toString();
          delete ret.account3.accountDetails._id;
        }
        return ret;
      },
    },
  }
);

module.exports = mongoose.model('Account', accountSchema);
