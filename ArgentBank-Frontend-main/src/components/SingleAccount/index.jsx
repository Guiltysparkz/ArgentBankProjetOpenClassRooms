import React, { useState } from 'react';
import { TransactionItem } from '../transactionItem';
import { AccountItem } from '../AccountItem';

export default function SingleAccount({
  myCurrentAccount,
  goBack,
  transactions,
  transactionStates,
  handleCategoryChange,
  handleNoteChange,
  saveTransactionDetails,
}) {
  const [expandedRows, setExpandedRows] = useState([]);

  const toggleRow = (index) => {
    setExpandedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="accountWrapper">
      <section className="account-header">
        <AccountItem
          accountNumber={myCurrentAccount.accountDetails.accountNumber}
          accountBalance={myCurrentAccount.accountDetails.accountBalance}
          iconAccountShow={false}
          goBack={goBack}
        />
      </section>

      <section className="transactions">
        {/* Titles row */}
        <div className="transactionsTitles">
          <h4 className="transactionsTitleDate">Date</h4>
          <h4 className="transactionsTitleDescription">Description</h4>
          <h4 className="transactionsTitleAmount">Amount</h4>
          <h4 className="transactionsTitleBalance">Balance</h4>
          <div></div>
        </div>
        {/* Transaction rows */}
        {transactions.map((transaction, index) => (
          <TransactionItem
            key={transaction._id || index} // Ensure unique key
            index={index}
            transaction={transaction}
            expandedRows={expandedRows}
            toggleRow={toggleRow}
            transactionStates={transactionStates}
            handleCategoryChange={handleCategoryChange}
            handleNoteChange={handleNoteChange}
            saveTransactionDetails={saveTransactionDetails}
          />
        ))}
      </section>
    </div>
  );
}
