import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth } from '../redux/authActions';

export default function UserName() {
  const { firstName, lastName, userName, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(checkAuth());
    }
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated) {
    return null; // Or a loading indicator
  }

  return (
    <div className="header">
      <h1>
        Welcome back {userName}
        <br />
        {firstName} {lastName}!
      </h1>
      <button className="edit-button">Edit Name</button>
    </div>
  );
}
