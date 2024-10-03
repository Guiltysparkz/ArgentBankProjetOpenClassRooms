import React from 'react';
import ReactDOM from 'react-dom/client';
import { useEffect } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import User from './pages/User';
import SignIn from './pages/SignIn';
import Transactions from './pages/Transactions';
import Error from './pages/Error';
import Header from './components/Header';
import Footer from './components/Footer';
import { store } from '../src/components/redux/store';
import { checkAuth } from './components/redux/authActions';

const ProtectedRoute = ({ element }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  // Check authentication status on load or refresh
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return isAuthenticated ? element : <Navigate to="/SignIn" />;
};

const App = () => {
  const dispatch = useDispatch();

  // Ensure that authentication is checked once when the app loads
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <>
      <Header /> {/* Shared Header */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/User" element={<ProtectedRoute element={<User />} />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route
          path="/Transactions/:myCurrentAccountNumber"
          element={<ProtectedRoute element={<Transactions />} />}
        />
        <Route path="*" element={<Navigate to="/Error" />} />
        <Route path="/Error" element={<Error />} />
      </Routes>
      <Footer /> {/* Shared Footer */}
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
