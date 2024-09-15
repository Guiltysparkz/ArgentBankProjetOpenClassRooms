import { createAsyncThunk } from '@reduxjs/toolkit';

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
