/**
 * ====================================================================
 * CROWDSOLVE - EVAL 1
 * --------------------------------------------------------------------
 * File: Navbar.jsx
 * Contributor: Member 1 (Surbhi - Project Lead)
 * Description: Main navigation bar with brand logo, nav links, auth status indicator, and mobile menu toggle.
 * ====================================================================
 */

import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import CitySelector from "./CitySelector";
import { useAuth } from "../hooks/useAuth";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, currentUser, logout } = useAuth();

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

        {/* Navigation links — center */}
        <nav
          className={`navbar__links ${menuOpen ? "is-open" : ""}`}
          aria-label="Main navigation"
        >
          <NavLink
            to="/problems"
            end
            onClick={closeMenu}
            className={({ isActive }) =>
              `navbar__link ${isActive ? "navbar__link--active" : ""}`
            }
          >
            Problems
          </NavLink>
          <a
            href="/#how-it-works"
            onClick={closeMenu}
            className="navbar__link"
          >
            Solutions
          </a>
          <a
            href="/#how-it-works"
            onClick={closeMenu}
            className="navbar__link"
          >
            How It Works
          </a>
          <a
            href="/#city-selector"
            onClick={closeMenu}
            className="navbar__link"
          >
            Community
          </a>

          {/* City selector inline for mobile menu */}
          <div className="navbar__mobile-city">
            <CitySelector variant="compact" />
          </div>

          {/* Mobile-only Auth links */}
          <div className="navbar__mobile-auth">
            {isLoggedIn ? (
              <>
                <NavLink to="/dashboard" onClick={closeMenu} className="navbar__link">
                  Dashboard ({currentUser.name ? currentUser.name.split(" ")[0] : "User"})
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
              <div className="navbar__mobile-auth-links">
                <NavLink to="/login" onClick={closeMenu} className="navbar__link navbar__auth-link">
                  Login
                </NavLink>
                <NavLink to="/signup" onClick={closeMenu} className="navbar__link navbar__auth-link">
                  Register
                </NavLink>
              </div>
            )}
          </div>
        </nav>

        {/* Right side: City Selector + Post Button + Right-most Login/Register */}
        <div className="navbar__right">
          <div className="navbar__city-desktop">
            <CitySelector variant="compact" />
          </div>

          <Link to="/post" className="btn btn-primary navbar__post-btn">
            POST A PROBLEM +
          </Link>

          {/* Right-most Auth Group */}
          <div className="navbar__auth-desktop">
            {isLoggedIn ? (
              <div className="navbar__user-menu">
                <NavLink to="/dashboard" className="navbar__auth-link navbar__auth-link--dashboard">
                  Dashboard ({currentUser.name ? currentUser.name.split(" ")[0] : "User"})
                </NavLink>
                <button
                  type="button"
                  className="navbar__auth-link navbar__logout-btn"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="navbar__guest-auth">
                <NavLink to="/login" className="navbar__auth-link">
                  Login
                </NavLink>
                <span className="navbar__auth-slash">/</span>
                <NavLink to="/signup" className="navbar__auth-link">
                  Register
                </NavLink>
              </div>
            )}
          </div>

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
