import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editUsername, updateUserName } from '../redux/authActions';
import { toggleEditForm } from '../redux/formVisibilityReducer';

export default function EditUsernameForm() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    setUserName(auth.userName || '');
  }, [auth.userName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editUsername({ userName })).then(() => {
      dispatch(updateUserName(userName));
      dispatch(toggleEditForm());
    });
  };

  const handleCancel = () => {
    dispatch(toggleEditForm());
  };

  return (
    <section className="editUsernameForm">
      {auth.error && <p style={{ color: 'red' }}>{auth.error}</p>}
      <h1 className="editFormTitle">Edit user info</h1>
      <form onSubmit={handleSubmit}>
        <div className="formInputWrapper">
          <div className="formRow">
            <label htmlFor="userName">User name: </label>
            <input
              type="text"
              name="userName"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="formRow">
            <label htmlFor="firstName">First name: </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={auth.firstName || ''}
              disabled
            />
          </div>
          <div className="formRow">
            <label htmlFor="lastName">Last name: </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={auth.lastName || ''}
              disabled
            />
          </div>
        </div>
        <div className="formButtonsWrapper">
          <button className="formSubmitButton" type="submit">
            Save
          </button>
          <button
            className="formCancelButton"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
