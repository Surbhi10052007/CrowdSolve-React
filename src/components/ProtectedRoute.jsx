/**
 * ====================================================================
 * CROWDSOLVE - EVAL 1
 * --------------------------------------------------------------------
 * File: ProtectedRoute.jsx
 * Contributor: Member 1 (Surbhi - Project Lead)
 * Description: Higher-order route wrapper to guard private routes and redirect unauthenticated users to /login.
 * ====================================================================
 */

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
