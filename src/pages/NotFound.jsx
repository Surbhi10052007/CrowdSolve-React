/**
 * ====================================================================
 * CROWDSOLVE - EVAL 1
 * --------------------------------------------------------------------
 * File: NotFound.jsx
 * Contributor: Member 3 (Karan Kumar - Discovery & Authentication)
 * Description: Custom 404 error page displayed when navigating to unknown routes with quick navigation back home.
 * ====================================================================
 */

import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="container not-found__inner">
        <p className="not-found__code">404</p>
        <h1>THIS PROBLEM DOESN'T EXIST.</h1>
        <p className="not-found__desc">
          The page you're looking for was moved, solved, or never reported
          in the first place.
        </p>
        <Link to="/" className="btn btn-primary">
          BACK TO HOME →
        </Link>
      </div>
    </div>
  );
}
