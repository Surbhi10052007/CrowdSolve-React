// Footer.jsx — Site footer with logo, navigation columns, and copyright.

import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__top">
          <p className="footer__logo">CROWDSOLVE</p>
          <p className="footer__tagline">
            Where everyday problems become community-powered solutions.
          </p>
        </div>

        <div className="footer__columns">
          <div className="footer__col">
            <p className="footer__col-title">Platform</p>
            <Link to="/problems">Problems</Link>
            <Link to="/post">Post a Problem</Link>
            <Link to="/dashboard">Dashboard</Link>
          </div>
          <div className="footer__col">
            <p className="footer__col-title">Account</p>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
          <div className="footer__col">
            <p className="footer__col-title">Community</p>
            <a href="/#how-it-works">How It Works</a>
            <a href="#top">Back to top</a>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} CrowdSolve. A student project.</p>
        </div>
      </div>
    </footer>
  );
}
