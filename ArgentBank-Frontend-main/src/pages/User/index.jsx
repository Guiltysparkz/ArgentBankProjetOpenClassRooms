import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth } from '../../components/redux/authActions';
import UserName from '../../components/UserName';
import Accounts from '../../components/Accounts';
import EditUsernameForm from '../../components/EditForm';
import { getAccounts } from '../../components/redux/accountsActions';

export default function User() {
  const { firstName, lastName, userName, isAuthenticated, isLoading } =
    useSelector((state) => state.auth);
  const { isEditFormVisible } = useSelector((state) => state.formVisibility); // Access form visibility state from Redux
  const dispatch = useDispatch();

  const {
    accountsData,
    isLoading: accountLoading,
    error,
  } = useSelector((state) => state.accounts || {});
  // Dispatch checkAuth on component mount
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(checkAuth());
    }
  }, [dispatch, isAuthenticated]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="main">
      {!isEditFormVisible && (
        <UserName
          firstName={firstName}
          lastName={lastName}
          userName={userName}
          isAuthenticated={isAuthenticated}
        />
      )}
      {/* Conditionally render the EditUsernameForm based on the state */}
      {isEditFormVisible && <EditUsernameForm />}
      <Accounts
        accountsData={accountsData}
        isLoading={accountLoading}
        error={error}
        getAccounts={getAccounts}
        dispatch={dispatch}
      />
    </div>
  );
}
