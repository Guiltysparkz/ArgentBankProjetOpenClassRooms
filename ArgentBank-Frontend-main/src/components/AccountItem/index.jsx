import React from 'react';
import { Link } from 'react-router-dom';
import iconAccount from '../../assets/images/icon-account.png';

export const AccountItem = ({
  accountNumber,
  accountBalance,
  iconAccountShow,
  goBack,
}) => {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        {/* Conditional rendering depending on iconAccountShow prop */}
        {iconAccountShow ? (
          <Link to={`/Transactions/${accountNumber}`}>
            <div className="accountItemDetails">
              <h3 className="account-title">
                Argent Bank Checking ({accountNumber})
              </h3>
              <p className="account-amount">${accountBalance}</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="accountIcon">
              <img src={iconAccount} alt="Account Icon" />
            </div>
          </Link>
        ) : (
          <div className="singleAccountWrapper">
            <div className="accountItemDetails">
              <h3 className="account-title">
                Argent Bank Checking ({accountNumber})
              </h3>
              <p className="account-amount">${accountBalance}</p>
              <p className="account-amount-description">Available Balance</p>
              {/* Back button */}
            </div>
            <button className="close-btn" onClick={goBack}>
              X
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
