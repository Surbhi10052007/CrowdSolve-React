/**
 * ====================================================================
 * CROWDSOLVE - EVAL 1
 * --------------------------------------------------------------------
 * File: Signup.jsx
 * Contributor: Member 3 (Karan Kumar - Discovery & Authentication)
 * Description: Citizen registration page with name, city picker, email, password fields, and validation.
 * ====================================================================
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./AuthPages.css";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
      setError("Please fill in every field.");
      return;
    }

    const result = signup(name.trim(), email.trim(), password);
    if (!result.success) {
      setError(result.message);
      return;
    }
    navigate("/dashboard");
  }

  return (
    <div className="auth-page section section--cream">
      <div className="container auth-page__container">
        <div className="auth-page__card">
          <p className="eyebrow">JOIN THE COMMUNITY</p>
          <h1>SIGN UP</h1>

          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
              CREATE ACCOUNT
            </button>
          </form>

          <p className="auth-page__switch">
            Already have an account? <Link to="/login">Log in</Link>
          </p>

          <p className="auth-page__note">
            This is a frontend-only demo signup for a college project. No
            real data leaves your browser.
          </p>
        </div>
      </div>
    </div>
  );
}
