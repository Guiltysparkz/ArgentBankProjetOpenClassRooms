import React from 'react';

export default function SignInForm({ email, setEmail, password, setPassword, rememberMe, setRememberMe, handleSubmit }) {
  return (
    <section className="sign-in-content" id="login">
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
