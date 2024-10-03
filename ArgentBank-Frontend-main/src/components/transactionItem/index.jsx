import React, { useState } from 'react';

export const TransactionItem = ({
  index,
  transaction,
  expandedRows,
  toggleRow,
  transactionStates,
  handleCategoryChange,
  handleNoteChange,
  saveTransactionDetails,
}) => {
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState(false);

  const toggleEditCategory = () => {
    setIsEditingCategory((prev) => !prev);
  };

  const toggleEditNote = () => {
    setIsEditingNote((prev) => !prev);
  };

  return (
    <div className="transaction-item">
      {/* Transaction row */}
      <div className="transaction-date">{transaction.date}</div>
      <div className="transaction-description">{transaction.description}</div>
      <div className="transaction-amount">${transaction.transactionAmount}</div>
      <div className="transaction-balance">
        ${transaction.balanceAfterTransaction}
      </div>
      <div className="transaction-toggle">
        <button className="expand-btn" onClick={() => toggleRow(index)}>
          {expandedRows.includes(index) ? 'v' : '>'}
        </button>
      </div>

      {/* Collapsible content */}
      {expandedRows.includes(index) && (
        <div className="collapsed-content">
          {/* Type */}
          <div className="collapsed-row">
            <span className="label">Type: </span>
            <span className="value">{transaction.transactionType}</span>
            <span className="edit-icon"></span> {/* No edit for type */}
          </div>

          {/* Category */}
          <div className="collapsed-row">
            <span className="label">Category: </span>
            {isEditingCategory ? (
              <select
                className="value select-category"
                value={transactionStates[index]?.category}
                onChange={(e) => handleCategoryChange(index, e.target.value)}
              >
                <option value="Food">Food</option>
                <option value="Service">Service</option>
                <option value="Utilities">Utilities</option>
              </select>
            ) : (
              <span className="value">
                {transactionStates[index]?.category}
              </span>
            )}
            <button className="edit-icon" onClick={toggleEditCategory}>
              ✏️
            </button>
          </div>

          {/* Note */}
          <div className="collapsed-row">
            <span className="label">Note: </span>
            {isEditingNote ? (
              <input
                type="text"
                className="value input-note"
                value={transactionStates[index]?.note || ''}
                onChange={(e) => handleNoteChange(index, e.target.value)}
              />
            ) : (
              <span className="value">
                {transactionStates[index]?.note || 'No note'}
              </span>
            )}
            <button className="edit-icon" onClick={toggleEditNote}>
              ✏️
            </button>
          </div>

          {/* Save button */}
          {isEditingCategory || isEditingNote ? (
            <div className="transaction-save">
              <button
                onClick={() => saveTransactionDetails(index, transaction._id)}
              >
                Save
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
