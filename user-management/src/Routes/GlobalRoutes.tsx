import React, { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../interfaces/AuthContext";
import LoginPage from "../page/LoginPage";
import AdminPage from "../page/AdminPage";
import UserProfile from "../page/UserPage";
import ProtectedRoute from "../Routes/ProtectedRoutes";
import RegisterPage from "../page/RegisterPage";
import Navbar from "../components/Navbar";

const GlobalRoutes: FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
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
};

export default GlobalRoutes;
