import { createSlice } from '@reduxjs/toolkit';
import { getAccounts } from './accountsActions';
import { initialStates } from './initialStates';

// Define the accounts slice
const accountsSlice = createSlice({
  name: 'accounts',
  initialState: initialStates.accounts,
  reducers: {
    updateTransactionDetailsInStore: (state, action) => {
      const { accountNumber, transactionId, updatedTransaction } =
        action.payload;

      console.log(
        'Reducer action triggered:',
        accountNumber,
        transactionId,
        updatedTransaction
      );

      const account = Object.values(state.accountsData).find(
        (acc) => acc.accountDetails.accountNumber === accountNumber
      );

      if (account) {
        const transaction = account.transactions.find(
          (trans) => trans._id === transactionId
        );

        if (transaction) {
          transaction.transactionCategory =
            updatedTransaction.transactionCategory;
          transaction.transactionNote = updatedTransaction.transactionNote;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAccounts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAccounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accountsData = action.payload;
      })
      .addCase(getAccounts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch accounts';
      })
      // Add the manually dispatched action type 'UPDATE_TRANSACTION_DETAILS'
      .addCase('UPDATE_TRANSACTION_DETAILS', (state, action) => {
        const { accountNumber, transactionId, updatedTransaction } =
          action.payload;

        console.log(
          'Reducer action triggered - Updating transaction in the store:',
          accountNumber,
          transactionId,
          updatedTransaction
        );

        const account = Object.values(state.accountsData).find(
          (acc) => acc.accountDetails.accountNumber === accountNumber
        );

        if (account) {
          const transaction = account.transactions.find(
            (trans) => trans._id === transactionId
          );

          if (transaction) {
            console.log('Before update:', transaction);

            // Update transaction details
            transaction.transactionCategory =
              updatedTransaction.transactionCategory;
            transaction.transactionNote = updatedTransaction.transactionNote;

            console.log('After update:', transaction);
          }
        }
      });
  },
});

export const { updateTransactionDetailsInStore } = accountsSlice.actions;
export default accountsSlice.reducer;
