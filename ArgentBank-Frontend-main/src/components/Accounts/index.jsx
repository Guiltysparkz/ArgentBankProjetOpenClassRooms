import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAccounts } from '../redux/accountsActions';
import { useDispatch, useSelector } from 'react-redux';

export default function Accounts() {
  const dispatch = useDispatch();
  const { accountsData, isLoading, error } = useSelector(
    (state) => state.accounts
  );

  useEffect(() => {
    dispatch(getAccounts());
  }, [dispatch]);

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
      <section className="account">
        <div className="account-content-wrapper">
          <Link
            to={`/Transactions/${accountsData.account1.accountDetails.accountNumber}`}
          >
            <h3 className="account-title">
              Argent Bank Checking (
              {accountsData.account1.accountDetails.accountNumber})
            </h3>
            <p className="account-amount">
              ${accountsData.account1.accountDetails.accountBalance}
            </p>
            <p className="account-amount-description">Available Balance</p>
          </Link>
        </div>
        {/* <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div> */}
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <Link
            to={`/Transactions/${accountsData.account2.accountDetails.accountNumber}`}
          >
            <h3 className="account-title">
              Argent Bank Checking (
              {accountsData.account2.accountDetails.accountNumber})
            </h3>
            <p className="account-amount">
              ${accountsData.account2.accountDetails.accountBalance}
            </p>
            <p className="account-amount-description">Available Balance</p>
          </Link>
        </div>
        {/* <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div> */}
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <Link
            to={`/Transactions/${accountsData.account3.accountDetails.accountNumber}`}
          >
            <h3 className="account-title">
              Argent Bank Checking (
              {accountsData.account3.accountDetails.accountNumber})
            </h3>
            <p className="account-amount">
              ${accountsData.account3.accountDetails.accountBalance}
            </p>
            <p className="account-amount-description">Available Balance</p>
          </Link>
        </div>
        {/* <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div> */}
      </section>
    </div>
  );
}
