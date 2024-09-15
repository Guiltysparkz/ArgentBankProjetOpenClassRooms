import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editUsername, updateUserName } from '../redux/authActions';

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
    });
  };

  const handleCancel = () => {
    setUserName(auth.userName || '');
  };

  return (
    <section className="editUsernameForm">
      {auth.error && <p style={{ color: 'red' }}>{auth.error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="userName"
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={auth.firstName || ''}
          disabled
        />
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={auth.lastName || ''}
          disabled
        />
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </section>
  );
}
