import React, {FC} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../interfaces/AuthContext';
import LoginPage from '../components/LoginPage';
import AdminPage from '../components/AdminPage';
import UserProfile from '../components/UserPage';
import ProtectedRoute from '../Routes/ProtectedRoutes';
import RegisterPage from '../components/RegisterPage';

const GlobalRoutes:FC=()=> {
    return (
        <AuthProvider>
          <Router>
            <Routes>
            <Route path="/" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile/:id"
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </AuthProvider>
      );
}

export default GlobalRoutes;