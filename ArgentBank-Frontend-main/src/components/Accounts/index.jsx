import React, { useEffect } from 'react';
import { AccountItem } from '../AccountItem';

export default function Accounts({
  accountsData,
  isLoading,
  error,
  getAccounts,
  dispatch,
}) {
  useEffect(() => {
    if (!accountsData) {
      dispatch(getAccounts());
    }
  }, [dispatch, accountsData, getAccounts]); //getAccounts slice to update store with accountsData

  if (isLoading) {
    return <div>Loading accounts...</div>;
  }

  if (error) {
    return <div>Error fetching accounts: {error}</div>;
  }

  if (!accountsData) {
    return <div>No accounts available.</div>;
  }

  return (
    <div className="accountWrapper">
      <div className="account-content-wrapper">
        <AccountItem
          accountNumber={accountsData.account1.accountDetails.accountNumber}
          accountBalance={accountsData.account1.accountDetails.accountBalance}
          iconAccountShow={true}
        />
      </div>
      <div className="account-content-wrapper">
        <AccountItem
          accountNumber={accountsData.account2.accountDetails.accountNumber}
          accountBalance={accountsData.account2.accountDetails.accountBalance}
          iconAccountShow={true}
        />
      </div>
      <div className="account-content-wrapper">
        <AccountItem
          accountNumber={accountsData.account3.accountDetails.accountNumber}
          accountBalance={accountsData.account3.accountDetails.accountBalance}
          iconAccountShow={true}
        />
      </div>
    </div>
  );
}
