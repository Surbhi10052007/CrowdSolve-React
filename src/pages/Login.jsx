// Login.jsx — Authentication Page.
//
// Syllabus Alignment:
// - Form Handling in React: Form validation strategies & reusable FormField (Lectures 55-60)
// - Controlled inputs & live error states
// - Route navigation & state redirect (Lectures 37-48)

import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import FormField from "../components/FormField";
import "./AuthPages.css";

export default function Login() {
  const { login, demoLogin } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (serverError) setServerError("");
  }

  function validate() {
    const errs = {};
    if (!formData.email.trim()) {
      errs.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      errs.password = "Password is required.";
    } else if (formData.password.length < 6) {
      errs.password = "Password must be at least 6 characters.";
    }

    return errs;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    setServerError("");

    setTimeout(() => {
      const result = login(formData.email.trim(), formData.password);
      setIsSubmitting(false);

      if (!result.success) {
        setServerError(result.message);
        addToast(result.message, "error");
        return;
      }

      addToast("Welcome back to CrowdSolve!", "success");
      const redirectTo = location.state?.from || "/dashboard";
      navigate(redirectTo);
    }, 400);
  }

  // Quick 1-click test credentials for evaluation examiners
  function handleQuickDemo(type) {
    demoLogin(type);
    addToast(`Logged in as ${type === "admin" ? "Admin Moderator" : "Citizen (Ravi)"}`, "success");
    const redirectTo = type === "admin" ? "/admin" : "/dashboard";
    navigate(redirectTo);
  }

  return (
    <div className="auth-page section section--cream">
      <div className="container auth-page__container">
        <div className="auth-page__card">
          <p className="eyebrow">COMMUNITY ACCESS</p>
          <h1>LOG IN</h1>
          <p className="auth-page__desc">
            Sign in to track reported problems, propose community fixes, and earn karma.
          </p>

          {/* Quick Demo Logins for Examiner */}
          <div className="auth-page__demo-box">
            <p className="auth-page__demo-title">⚡ Quick Examiner Demo Access:</p>
            <div className="auth-page__demo-buttons">
              <button
                type="button"
                className="btn-demo"
                onClick={() => handleQuickDemo("citizen")}
                title="Log in as demo citizen user"
              >
                👤 Citizen Mode
              </button>
              <button
                type="button"
                className="btn-demo"
                onClick={() => handleQuickDemo("admin")}
                title="Log in as admin moderator"
              >
                🛡️ Admin Panel
              </button>
            </div>
          </div>

          <div className="auth-page__divider">
            <span>OR SIGN IN MANUALLY</span>
          </div>

          {serverError && (
            <div className="auth-page__error-banner" role="alert">
              <span>✕</span> {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <FormField
              id="email"
              label="Email Address"
              error={errors.email}
              required
            >
              <input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "has-error" : ""}
                autoComplete="email"
              />
            </FormField>

            <FormField
              id="password"
              label="Password"
              error={errors.password}
              required
            >
              <div className="input-with-action">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "has-error" : ""}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="input-action-btn"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </FormField>

            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={isSubmitting}
            >
              {isSubmitting ? "SIGNING IN..." : "LOG IN →"}
            </button>
          </form>

          <p className="auth-page__switch">
            Don't have an account? <Link to="/signup">Register here</Link>
          </p>

          <p className="auth-page__note">
            Evaluation Demo: Frontend client-side state persisted via localStorage.
          </p>
        </div>
      </div>
    </div>
  );
}
