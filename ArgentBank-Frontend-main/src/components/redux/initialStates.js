export const initialStates = {
  auth: {
    isAuthenticated: false,
    isLoading: true, // Initially true since we haven't checked auth yet
    firstName: null,
    lastName: null,
    userName: null,
  },
  accounts: { accountsData: undefined },
};
