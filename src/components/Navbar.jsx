// Navbar.jsx — Top navigation bar with logo, center links, city selector,
// right-side Login and Post buttons, and responsive drawer menu.
//
// Syllabus Alignment:
// - Lectures 43-48: Navigation layout & page structure in Multi-page SPA
// - Context API integration (AuthContext + CityContext)

import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import CitySelector from "./CitySelector";
import { useAuth } from "../hooks/useAuth";
import { useProblems } from "../hooks/useProblemsContext";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, currentUser, isAdmin, logout } = useAuth();
  const { bookmarks } = useProblems();
  const bookmarkCount = bookmarks.length;

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        {/* Logo — links back to homepage */}
        <Link to="/" className="navbar__logo" onClick={closeMenu}>
          CROWDSOLVE
        </Link>

        {/* Center navigation links (only core navigation items) */}
        <nav
          className={`navbar__links ${menuOpen ? "is-open" : ""}`}
          aria-label="Main navigation"
        >
          <NavLink to="/problems" onClick={closeMenu} className="navbar__link">
            Problems
          </NavLink>
          <NavLink to="/impact" onClick={closeMenu} className="navbar__link">
            Impact
          </NavLink>
          <NavLink to="/solved" onClick={closeMenu} className="navbar__link">
            Solved ✓
          </NavLink>
          <a href="/#how-it-works" onClick={closeMenu} className="navbar__link">
            How It Works
          </a>

          {/* City selector inline for mobile menu */}
          <div className="navbar__mobile-city">
            <CitySelector variant="compact" />
          </div>

          {/* Mobile auth links inside drawer */}
          <div className="navbar__mobile-auth">
            <NavLink to="/watchlist" onClick={closeMenu} className="navbar__link">
              🔖 Watchlist{bookmarkCount > 0 ? ` (${bookmarkCount})` : ""}
            </NavLink>
            {isLoggedIn ? (
              <>
                {isAdmin && (
                  <NavLink
                    to="/admin"
                    onClick={closeMenu}
                    className="navbar__link"
                    style={{ color: "var(--color-lime)" }}
                  >
                    Admin 🛡️
                  </NavLink>
                )}
                <NavLink
                  to="/dashboard"
                  onClick={closeMenu}
                  className="navbar__link"
                >
                  Dashboard ({currentUser.name.split(" ")[0]})
                </NavLink>
                <button
                  type="button"
                  className="navbar__link navbar__logout"
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                onClick={closeMenu}
                className="btn btn-primary navbar__mobile-login-btn"
              >
                LOGIN
              </NavLink>
            )}
            <Link
              to="/post"
              onClick={closeMenu}
              className="btn btn-primary navbar__mobile-post-btn"
            >
              POST A PROBLEM +
            </Link>
          </div>
        </nav>

        {/* Right side — City Selector + Login Button + Post Problem Button */}
        <div className="navbar__right">
          <div className="navbar__city-desktop">
            <CitySelector variant="compact" />
          </div>

          {/* Login or User Profile shifted to the RIGHT side */}
          {isLoggedIn ? (
            <div className="navbar__auth-desktop">
              {isAdmin && (
                <NavLink
                  to="/admin"
                  className="navbar__admin-badge"
                  title="Admin Dashboard"
                >
                  🛡️ Admin
                </NavLink>
              )}
              <NavLink
                to="/watchlist"
                className="navbar__link"
                title="My Watchlist"
              >
                🔖{bookmarkCount > 0 && <span className="navbar__badge">{bookmarkCount}</span>}
              </NavLink>
              <NavLink
                to="/dashboard"
                className="navbar__user-pill"
                title="Go to User Dashboard"
              >
                👤 {currentUser.name.split(" ")[0]}
              </NavLink>
              <button
                type="button"
                className="navbar__logout-btn"
                onClick={logout}
                title="Log Out"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <NavLink to="/watchlist" className="navbar__link" title="Watchlist">
                🔖{bookmarkCount > 0 && <span className="navbar__badge">{bookmarkCount}</span>}
              </NavLink>
              <Link
                to="/login"
                className="btn btn-primary navbar__login-btn"
                id="navbar-login-btn"
              >
                LOGIN
              </Link>
            </>
          )}

          {/* Post a Problem Button */}
          <Link to="/post" className="btn btn-primary navbar__post-btn">
            POST A PROBLEM +
          </Link>

          {/* Mobile hamburger menu button */}
          <button
            type="button"
            className="navbar__hamburger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
