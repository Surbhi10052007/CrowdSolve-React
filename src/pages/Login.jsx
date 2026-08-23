/**
 * ====================================================================
 * CROWDSOLVE - EVAL 1
 * --------------------------------------------------------------------
 * File: Login.jsx
 * Contributor: Member 3 (Karan Kumar - Discovery & Authentication)
 * Description: Citizen authentication login page with email/password input, mock login support, and redirect on success.
 * ====================================================================
 */

import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./AuthPages.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const result = login(email, password);
    if (!result.success) {
      setError(result.message);
      return;
    }
    // Redirect back to the page they came from, or to dashboard.
    const redirectTo = location.state?.from || "/dashboard";
    navigate(redirectTo);
  }

  return (
    <div className="auth-page section section--cream">
      <div className="container auth-page__container">
        <div className="auth-page__card">
          <p className="eyebrow">WELCOME BACK</p>
          <h1>LOG IN</h1>

          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="field-error">{error}</p>}

            <button type="submit" className="btn btn-primary btn-block">
              LOG IN
            </button>
          </form>

          <p className="auth-page__switch">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>

          <p className="auth-page__note">
            This is a frontend-only demo login for a college project. No real
            data leaves your browser.
          </p>
        </div>
      </div>
    </div>
  );
}
