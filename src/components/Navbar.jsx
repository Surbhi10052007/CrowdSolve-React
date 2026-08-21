// Navbar.jsx — Top navigation bar with logo, links, city selector,
// responsive hamburger menu, and login/logout state.

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

        {/* Navigation links — toggled on mobile via hamburger */}
        <nav
          className={`navbar__links ${menuOpen ? "is-open" : ""}`}
          aria-label="Main navigation"
        >
          <NavLink to="/problems" onClick={closeMenu} className="navbar__link">
            Problems
          </NavLink>
          <NavLink to="/problems" onClick={closeMenu} className="navbar__link">
            Solutions
          </NavLink>
          <a href="/#how-it-works" onClick={closeMenu} className="navbar__link">
            How It Works
          </a>
          <NavLink to="/problems" onClick={closeMenu} className="navbar__link">
            Community
          </NavLink>

          {/* City selector inline for mobile menu */}
          <div className="navbar__mobile-city">
            <CitySelector variant="compact" />
          </div>

          {/* Auth links */}
          {isLoggedIn ? (
            <>
              <NavLink to="/dashboard" onClick={closeMenu} className="navbar__link">
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
            <NavLink to="/login" onClick={closeMenu} className="navbar__link">
              Login
            </NavLink>
          )}
        </nav>

        {/* Right side — city selector (desktop) + post button + hamburger */}
        <div className="navbar__right">
          <div className="navbar__city-desktop">
            <CitySelector variant="compact" />
          </div>
          <Link to="/post" className="btn btn-primary navbar__post-btn">
            POST A PROBLEM +
          </Link>
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
