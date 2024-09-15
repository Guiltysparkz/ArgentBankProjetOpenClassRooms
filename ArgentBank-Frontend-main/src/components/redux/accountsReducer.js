// accountsReducer.js
import { createSlice } from '@reduxjs/toolkit';
import { getAccounts } from './accountsActions';

const accountsSlice = createSlice({
  name: 'accounts',
  initialState: {
    accountsData: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
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
      });
  },
});

export default accountsSlice.reducer;
