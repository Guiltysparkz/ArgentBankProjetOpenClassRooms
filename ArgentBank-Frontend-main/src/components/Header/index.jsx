import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ArgentBankLogo from '../../assets/images/argentBankLogo.png';
import { logout } from '../redux/authActions';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser as faUserRegular } from '@fortawesome/free-regular-svg-icons'; // Regular version
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'; // Solid for power off

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
            <Link className="main-nav-item" to="/">
              Home
            </Link>
            <h3 className="headerUsername">{userName}</h3>
            <Link className="main-nav-item" to="/User">
              <div className="userBackground">
                <FontAwesomeIcon
                  icon={faUserRegular}
                  style={{ color: 'white', height: '30px', width: '30px' }}
                />
              </div>
            </Link>
            <Link className="main-nav-item" to="/" onClick={handleLogout}>
              <FontAwesomeIcon
                icon={faPowerOff}
                style={{ color: '#61b37b', height: '50px', width: '50px' }}
              />
            </Link>
          </>
        ) : (
          <Link className="main-nav-item" to="/SignIn">
            Sign in
          </Link>
        )}
      </nav>
    </nav>
  );
}
