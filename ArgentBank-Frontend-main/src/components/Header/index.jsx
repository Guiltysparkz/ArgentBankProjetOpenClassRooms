import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ArgentBankLogo from '../../assets/images/argentBankLogo.png';
import { logout } from '../redux/authActions';
import { store } from '../redux/store';

export default function Header() {
  const location = useLocation();
  const [signInLink, setSignInLink] = useState('Sign in');

  useEffect(() => {
    if (location.pathname === '/User') {
      setSignInLink('Sign out');
    } else {
      setSignInLink('Sign in');
    }
  }, [location]);

  const removeCookie = () => {
    if (location.pathname === '/User') {
      store.dispatch(logout());
    }
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img src={ArgentBankLogo} alt="Argent Bank Logo" />
      </Link>
      <h1 className="sr-only">Argent Bank</h1>
      <div>
        <Link
          className="main-nav-item"
          to={signInLink === 'Sign out' ? '/' : '/SignIn'}
          onClick={signInLink === 'Sign out' ? removeCookie : undefined}
        >
          <i className="fa fa-user-circle"></i>
          {signInLink}
        </Link>
      </div>
    </nav>
  );
}
