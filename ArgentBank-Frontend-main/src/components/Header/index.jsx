import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ArgentBankLogo from '../../assets/images/argentBankLogo.png';
import { logout } from '../redux/authActions';
import { useEffect } from 'react';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userName, isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    // This will trigger a re-render when authentication status changes
  }, [isAuthenticated]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); // Redirect to home after logging out
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img src={ArgentBankLogo} alt="Argent Bank Logo" />
      </Link>
      <h1 className="sr-only">Argent Bank</h1>
      <nav className="navBar">
        {isAuthenticated ? (
          <>
            <h3 className="headerUsername">{userName}</h3>

            <Link className="main-nav-item" to="/">
              <i className="fa fa-user-circle"></i>
              Home
            </Link>
            <Link className="main-nav-item" to="/User">
              <i className="fa fa-user-circle"></i>
              Profile
            </Link>
            <Link className="main-nav-item" to="/" onClick={handleLogout}>
              <i className="fa fa-user-circle"></i>
              Sign out
            </Link>
          </>
        ) : (
          <Link className="main-nav-item" to="/SignIn">
            <i className="fa fa-user-circle"></i>
            Sign in
          </Link>
        )}
      </nav>
    </nav>
  );
}
