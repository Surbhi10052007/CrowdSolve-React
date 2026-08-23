/**
 * ====================================================================
 * CROWDSOLVE - EVAL 1
 * --------------------------------------------------------------------
 * File: ProblemCard.jsx
 * Contributor: Member 2 (Shubhleen Kaur - Frontend & UI Components)
 * Description: Card component rendering individual problem preview with category tag, status badge, vote counter, and thumbnail.
 * ====================================================================
 */

import { Link } from "react-router-dom";
import "./ProblemCard.css";

export default function ProblemCard({ problem }) {
  return (
    <article className="problem-card">
      <div className="problem-card__image-wrap">
        <img
          src={problem.image}
          alt={problem.title}
          className="problem-card__image"
        />
        <span className="problem-card__category">{problem.category}</span>
      </div>

      <div className="problem-card__body">
        <h3 className="problem-card__title">{problem.title}</h3>
        <p className="problem-card__desc">{problem.description}</p>

        <p className="problem-card__location">
          📍 {problem.city} · {problem.location}
        </p>

        <div className="problem-card__meta">
          <span>{problem.votes} votes</span>
          <span className="problem-card__dot">·</span>
          <span>{problem.solutions} solutions</span>
        </div>

        <div className="problem-card__footer">
          <span className={`status-pill status-pill--${statusClass(problem.status)}`}>
            {problem.status.toUpperCase()}
          </span>
          <Link to={`/problems/${problem.id}`} className="problem-card__link">
            VIEW PROBLEM →
          </Link>
        </div>
      </div>
    </article>
  );
}

// Helper — turns "In Progress" into "in-progress" for CSS class.
function statusClass(status) {
  return status.toLowerCase().replace(/\s+/g, "-");
}
