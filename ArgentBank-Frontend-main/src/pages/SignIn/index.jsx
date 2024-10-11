import React, { useState, useEffect } from 'react';
import SignInForm from '../../components/Auth/SignInForm';
import { login } from '../../components/redux/authActions';
import { useNavigate } from 'react-router-dom';
import { store } from '../../components/redux/store';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Store email in localStorage if "Remember me" is checked
    if (rememberMe) {
      localStorage.setItem('rememberedEmail', email);
    } else {
      localStorage.removeItem('rememberedEmail'); // Remove it if unchecked
    }

    store.dispatch(login(email, password, rememberMe)).then((result) => {
      navigate('/User');
    });
  };

  return (
    <div className="main bg-dark">
      <SignInForm
        email={email}
        password={password}
        rememberMe={rememberMe}
        setEmail={setEmail}
        setPassword={setPassword}
        setRememberMe={setRememberMe}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
