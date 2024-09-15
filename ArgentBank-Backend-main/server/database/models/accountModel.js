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
      transform: (doc, ret, options) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;

        //      Ensure that nested documents are not altered
        return ret;
      },
    },
  }
);

module.exports = mongoose.model('Account', accountSchema);
