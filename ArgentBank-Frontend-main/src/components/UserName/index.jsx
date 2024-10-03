import React from 'react';
import { toggleEditForm } from '../redux/formVisibilityReducer';
import { useDispatch } from 'react-redux';

export default function UserName({ firstName, lastName, userName }) {
  const dispatch = useDispatch();

  const handleToggleEditForm = () => {
    dispatch(toggleEditForm()); // Dispatch toggle action
  };
  return (
    <div className="header">
      <h1>
        Welcome back {userName}
        <br />
        {firstName} {lastName}!
      </h1>
      <button className="userName-edit-icon" onClick={handleToggleEditForm}>
        <i className="fa fa-edit"></i> Edit Username
      </button>
    </div>
  );
}
