import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editUsername } from '../redux/authActions';
import { toggleEditForm } from '../redux/formVisibilityReducer';

// Sanitize the input to remove unwanted characters
const sanitizeInput = (input) => {
  const sanitized = input.replace(/[<>/\\&'"]/g, ''); // Removing potential XSS characters
  return sanitized.trim(); // Remove leading/trailing spaces
};

export default function EditUsernameForm() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    setUserName(auth.userName || '');
  }, [auth.userName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const sanitizedUserName = sanitizeInput(userName); // Sanitize before dispatching
    dispatch(editUsername({ userName: sanitizedUserName })).then(() => {
      dispatch(toggleEditForm());
    });
  };

  const handleCancel = () => {
    dispatch(toggleEditForm());
  };

  const handleInputChange = (e) => {
    const sanitizedValue = sanitizeInput(e.target.value); // Sanitize input as the user types
    setUserName(sanitizedValue);
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
              onChange={handleInputChange}
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
