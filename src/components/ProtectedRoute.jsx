// ProtectedRoute.jsx — Wrapper component that redirects to /login
// if the user is not logged in.
//
// Usage: <ProtectedRoute><Dashboard /></ProtectedRoute>
// Demonstrates: Navigate, useLocation, conditional rendering.

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    // Pass the current path so Login can redirect back after success.
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}
