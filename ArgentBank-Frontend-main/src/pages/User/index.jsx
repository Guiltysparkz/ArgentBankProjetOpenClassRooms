import React from 'react';
import UserName from '../../components/UserName';
import Accounts from '../../components/Accounts';
import EditUsernameForm from '../../components/EditForm';

export default function User() {
  return (
    <div className="main">
      <UserName />
      <EditUsernameForm />
      <Accounts />
    </div>
  );
}
