import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './interfaces/AuthContext';
import LoginPage from './components/LoginPage';
import AdminPage from './components/AdminPage';
import UserProfile from './components/UserPage';
import ProtectedRoute from './Routes/ProtectedRoutes';
import RegisterPage from './components/RegisterPage';
import GlobalRoutes from './Routes/GlobalRoutes';

const App = () => {
  return (
    <GlobalRoutes />
  );
};

export default App;