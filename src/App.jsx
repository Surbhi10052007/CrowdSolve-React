/**
 * ====================================================================
 * CROWDSOLVE - EVAL 1
 * --------------------------------------------------------------------
 * File: App.jsx
 * Contributor: Member 1 (Surbhi - Project Lead)
 * Description: Core application layout, React Router configuration, Auth and City context providers.
 * ====================================================================
 */

//
// CityProvider  → shares the currently selected city across all pages.
// AuthProvider  → handles login / signup / logout and karma tracking.
// BrowserRouter → enables client-side routing via React Router.

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CityProvider } from "./hooks/useCity";
import { AuthProvider } from "./hooks/useAuth";

// Layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Problems from "./pages/Problems";
import ProblemDetails from "./pages/ProblemDetails";
import PostProblem from "./pages/PostProblem";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <AuthProvider>
      <CityProvider>
        <BrowserRouter>
          {/* Skip-to-content link for keyboard / screen-reader users */}
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>

          <Navbar />

          <main id="main-content">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/problems" element={<Problems />} />
              <Route path="/problems/:id" element={<ProblemDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected routes — redirect to /login if not logged in */}
              <Route
                path="/post"
                element={
                  <ProtectedRoute>
                    <PostProblem />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
        </BrowserRouter>
      </CityProvider>
    </AuthProvider>
  );
}
