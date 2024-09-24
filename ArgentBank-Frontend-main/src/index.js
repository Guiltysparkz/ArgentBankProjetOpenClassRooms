import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useDispatch, useSelector } from 'react-redux';
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
import { useEffect } from 'react';
import { checkAuth } from './components/redux/authActions';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  IsAuth();
  if (isLoading) {
    // Show a loading indicator or return null to wait for authentication check
    return <div>Loading...</div>;
  }

  return isAuthenticated ? element : <Navigate to="/SignIn" />;
};
const IsAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/User" element={<ProtectedRoute element={<User />} />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route
            path="/Transactions/:myCurrentAccountNumber"
            element={<Transactions />}
          />
          <Route path="*" element={<Navigate to="/Error" />} />
          <Route path="/Error" element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  </React.StrictMode>
);
