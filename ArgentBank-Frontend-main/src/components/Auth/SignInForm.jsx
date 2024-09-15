import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { login } from '../redux/authActions';
import { useNavigate } from 'react-router-dom';
import { store } from '../redux/store';

export default function SignInForm() {
  // const dispatch = useDispatch();
  // const auth = useSelector((state) => state.auth);

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
    // dispatch(login({ email, password, rememberMe })).then((result) => {
    //   if (result.meta.requestStatus === 'fulfilled') {
    //     navigate('/User'); // Redirect to the User page after successful login
    //   } else {
    //     console.log('Login failed:', result.meta.requestStatus);
    //   }
    // });
    store.dispatch(login(email, password, rememberMe)).then((result) => {
      navigate('/User'); // Redirect to the User page after successful login
    });
  };

  return (
    <section className="sign-in-content" id="login">
      {/* {auth.error && <p style={{ color: 'red' }}>{auth.error}</p>} */}
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>
        Sign In test: tony@stark.com <br></br> password123
      </h1>
      <form onSubmit={handleSubmit} method="post">
        <div className="input-wrapper">
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-remember">
          <input
            onChange={(e) => setRememberMe(e.target.checked)}
            type="checkbox"
            checked={rememberMe}
            id="remember-me"
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button type="submit" className="sign-in-button" id="submit-button">
          Sign In
        </button>
      </form>
    </section>
  );
}
