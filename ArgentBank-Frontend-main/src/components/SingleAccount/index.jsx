import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateTransactionDetails } from '../redux/accountsActions'; // Import the async action
import { getAccounts } from '../redux/accountsActions';

export default function SingleAccount() {
  const { myCurrentAccountNumber } = useParams(); // Get account number from URL
  const { accountsData } = useSelector((state) => state.accounts);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!accountsData) {
      dispatch(getAccounts());
    }
  }, [dispatch, accountsData]);

  const [expandedRows, setExpandedRows] = useState([]);
  const [transactionStates, setTransactionStates] = useState([]);

  useEffect(() => {
    if (accountsData) {
      const myCurrentAccount = Object.values(accountsData).find(
        (element) =>
          element.accountDetails.accountNumber === myCurrentAccountNumber
      );

      if (myCurrentAccount && myCurrentAccount.accountDetails) {
        const transactions = myCurrentAccount.transactions.slice(0, 5);

        if (transactions.length > 0 && transactionStates.length === 0) {
          setTransactionStates(
            transactions.map((transaction) => ({
              category: transaction.transactionCategory || 'Food',
              note: transaction.transactionNote || '',
            }))
          );
        }
      }
    }
  }, [accountsData, myCurrentAccountNumber, transactionStates.length]);

  const goBack = () => {
    navigate('/User');
  };

  const toggleRow = (index) => {
    setExpandedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleCategoryChange = (index, newCategory) => {
    setTransactionStates((prev) => {
      const updatedStates = [...prev];
      updatedStates[index].category = newCategory;
      return updatedStates;
    });
  };

  const handleNoteChange = (index, newNote) => {
    setTransactionStates((prev) => {
      const updatedStates = [...prev];
      updatedStates[index].note = newNote;
      return updatedStates;
    });
  };

  // Save transaction details to the backend
  const saveTransactionDetails = async (index, transactionId) => {
    const updatedTransaction = {
      transactionCategory: transactionStates[index].category,
      transactionNote: transactionStates[index].note,
    };

    const accountField = determineAccountField(myCurrentAccountNumber); // Determine if it's account1, account2, or account3
    console.log('Saving transaction with ID:', transactionId); // Log the transaction ID being sent
    // Dispatch the async thunk to update the backend and then the Redux store
    await dispatch(
      updateTransactionDetails({
        accountNumber: myCurrentAccountNumber, // Pass the account number
        accountField, // Pass the dynamically determined account field ('account1', 'account2', or 'account3')
        transactionId, // Pass the transaction ID
        updatedTransaction, // Pass the updated category and note
      })
    );
  };

  // Helper function to determine the correct account field based on the current account number
  const determineAccountField = (accountNumber) => {
    if (accountNumber === 'x0001') {
      return 'account1';
    } else if (accountNumber === 'x0002') {
      return 'account2';
    } else {
      return 'account3';
    }
  };

  if (!accountsData) {
    return <div>Loading account data...</div>;
  }

  const myCurrentAccount = Object.values(accountsData).find(
    (element) => element.accountDetails.accountNumber === myCurrentAccountNumber
  );

  if (!myCurrentAccount || !myCurrentAccount.accountDetails) {
    return <div>Account not found.</div>;
  }

  const transactions = myCurrentAccount.transactions.slice(
    0,
    myCurrentAccount.transactions.length
  );

  return (
    <div className="accountWrapper">
      <section className="account-header">
        <div>
          <h3>
            Argent Bank Checking (
            {myCurrentAccount.accountDetails.accountNumber})
          </h3>
          <p>${myCurrentAccount.accountDetails.accountBalance}</p>
          <p>Available Balance</p>
        </div>
        <button className="close-btn" onClick={goBack}>
          X
        </button>
      </section>

      <section className="transactions">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Balance After</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <React.Fragment key={index}>
                <tr className="transaction-row">
                  <td>{transaction.date}</td>
                  <td>{transaction.description}</td>
                  <td>${transaction.transactionAmount}</td>
                  <td>${transaction.balanceAfterTransaction}</td>
                  <td>
                    <button
                      className="expand-btn"
                      onClick={() => toggleRow(index)}
                    >
                      {expandedRows.includes(index) ? 'V' : '>'}
                    </button>
                  </td>
                </tr>
                <tr
                  className={`collapsed-content ${
                    expandedRows.includes(index) ? 'show' : ''
                  }`}
                >
                  <td colSpan="4">
                    <p>Type: {transaction.transactionType}</p>
                    <p>
                      Category:
                      <select
                        className={`select-category ${
                          expandedRows.includes(index) ? 'show' : ''
                        }`}
                        value={transactionStates[index]?.category}
                        onChange={(e) =>
                          handleCategoryChange(index, e.target.value)
                        }
                      >
                        <option value="Food">Food</option>
                        <option value="Service">Service</option>
                        <option value="Utilities">Utilities</option>
                      </select>
                    </p>
                    <p>
                      Note:
                      <input
                        type="text"
                        className={`input-note ${
                          expandedRows.includes(index) ? 'show' : ''
                        }`}
                        value={transactionStates[index]?.note || ''}
                        onChange={(e) =>
                          handleNoteChange(index, e.target.value)
                        }
                      />
                    </p>
                    <button
                      onClick={() =>
                        saveTransactionDetails(index, transaction._id)
                      }
                    >
                      Save
                    </button>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
