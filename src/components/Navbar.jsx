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

        {/* Center navigation links */}
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
          <NavLink
            to="/impact"
            onClick={closeMenu}
            className={({ isActive }) =>
              `navbar__link ${isActive ? "navbar__link--active" : ""}`
            }
          >
            Impact
          </NavLink>
          <NavLink
            to="/solved"
            onClick={closeMenu}
            className={({ isActive }) =>
              `navbar__link ${isActive ? "navbar__link--active" : ""}`
            }
          >
            Solved ✓
          </NavLink>
          <a
            href="/#how-it-works"
            onClick={closeMenu}
            className="navbar__link"
          >
            How It Works
          </a>

          {/* City selector inline for mobile menu */}
          <div className="navbar__mobile-city">
            <CitySelector variant="compact" />
          </div>

          {/* Mobile auth links inside drawer */}
          <div className="navbar__mobile-auth">
            {isLoggedIn ? (
              <>
                <NavLink to="/dashboard" onClick={closeMenu} className="navbar__link">
                  Dashboard ({currentUser?.name ? currentUser.name.split(" ")[0] : "User"})
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

        {/* Right side: City Selector + Login Button + Post Problem Button */}
        <div className="navbar__right">
          <div className="navbar__city-desktop">
            <CitySelector variant="compact" />
          </div>

          {/* Login or User Profile shifted to the RIGHT side */}
          {isLoggedIn ? (
            <div className="navbar__auth-desktop">
              <NavLink
                to="/dashboard"
                className="navbar__user-pill"
                title="Go to User Dashboard"
              >
                👤 {currentUser?.name ? currentUser.name.split(" ")[0] : "User"}
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
            <Link
              to="/login"
              className="btn btn-primary navbar__login-btn"
              id="navbar-login-btn"
            >
              LOGIN
            </Link>
          )}

          {/* Post a Problem Button */}
          <Link to="/post" className="btn btn-primary navbar__post-btn">
            POST A PROBLEM +
          </Link>

          {/* Mobile hamburger menu button */}
          <button
            type="button"
            className="navbar__hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className="navbar__bar" />
            <span className="navbar__bar" />
            <span className="navbar__bar" />
          </button>
        </div>
      </div>
    </header>
  );
}
