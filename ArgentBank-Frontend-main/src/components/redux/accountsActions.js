import { createAsyncThunk } from '@reduxjs/toolkit';

// Action to fetch accounts data
export const getAccounts = createAsyncThunk(
  'accounts/getAccounts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        'http://localhost:3001/api/v1/account/getAccounts',
        {
          method: 'GET',
          credentials: 'include', // Include cookies
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch accounts');
      }

      const data = await response.json();
      return data.body; // Assuming accounts data is in data.body
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to update transaction details on the backend
export const updateTransactionDetails = createAsyncThunk(
  'accounts/updateTransactionDetails',
  async (
    { accountNumber, accountField, transactionId, updatedTransaction },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/account/updateTransactionDetail`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            accountNumber,
            accountField,
            transactionId,
            ...updatedTransaction,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update transaction details');
      }

      const data = await response.json();

      // Log the success response
      console.log('API Response:', data);

      // After successful API call, dispatch to update the Redux store
      console.log('Dispatching updateTransactionDetailsInStore with:', {
        accountNumber,
        transactionId,
        updatedTransaction,
      });
      dispatch(
        updateTransactionDetailsInStore(
          accountNumber,
          transactionId,
          updatedTransaction
        )
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Action to update the transaction details in the store
export const updateTransactionDetailsInStore = (
  accountNumber,
  transactionId,
  updatedTransaction
) => ({
  type: 'UPDATE_TRANSACTION_DETAILS',
  payload: { accountNumber, transactionId, updatedTransaction },
});
