// ProblemDetails.jsx — Single problem view for Eval 1 (Light Theme).
// Demonstrates: useParams, dynamic routing, solutions listing, and problem details.

import { useParams, Link, Navigate } from "react-router-dom";
import { getProblemById } from "../data/problems";
import { useUserProblems } from "../hooks/useUserProblems";
import { getSolutionsByProblemId, getSolutionScore } from "../data/solutions";
import SolutionCard from "../components/SolutionCard";
import "./ProblemDetails.css";

export default function ProblemDetails() {
  const { id } = useParams();
  const { userProblems } = useUserProblems();

  // Check user-posted problems first, then mock data.
  const problem =
    userProblems.find((p) => p.id === Number(id)) || getProblemById(id);

  // Redirect to 404 if problem not found.
  if (!problem) {
    return <Navigate to="/404" replace />;
  }

  // Get and sort solutions by score (highest first).
  const solutionList = getSolutionsByProblemId(problem.id);
  const sortedSolutions = [...solutionList].sort(
    (a, b) => getSolutionScore(b) - getSolutionScore(a)
  );
  const topSolutionId = sortedSolutions[0] ? sortedSolutions[0].id : null;

  return (
    <div className="problem-details">
      {/* Header banner */}
      <div className="problem-details__banner">
        <div className="container">
          <div className="problem-details__breadcrumbs">
            <Link to="/problems">Problems</Link> / <span>{problem.city}</span> / <span>{problem.category}</span>
          </div>
          <span className="problem-details__category">{problem.category}</span>
          <h1 className="problem-details__title">{problem.title}</h1>
        </div>
      </div>

      <div className="container problem-details__layout">
        {/* Main content */}
        <div className="problem-details__main">
          <div className="problem-details__image-wrap">
            <img src={problem.image} alt={problem.title} className="problem-details__image" />
          </div>

          <div className="problem-details__meta-row">
            <span>📍 {problem.city} · {problem.location}</span>
            <span>👤 By {problem.author}</span>
            <span>📅 {problem.date}</span>
          </div>

          <h2 className="problem-details__heading">Problem Description</h2>
          <p className="problem-details__desc">{problem.description}</p>

          <hr className="problem-details__divider" />

          <div className="problem-details__solutions-header">
            <h2 className="problem-details__section-title">
              PROPOSED COMMUNITY SOLUTIONS ({solutionList.length})
            </h2>
          </div>

          {sortedSolutions.length > 0 ? (
            <div className="problem-details__solutions">
              {sortedSolutions.map((solution) => (
                <SolutionCard
                  key={solution.id}
                  solution={solution}
                  isTop={solution.id === topSolutionId}
                />
              ))}
            </div>
          ) : (
            <p className="problem-details__no-solutions">
              No solutions proposed for this issue yet.
            </p>
          )}
        </div>

        {/* Sidebar */}
        <aside className="problem-details__sidebar">
          <div className="problem-details__card">
            <h3 className="problem-details__card-title">ISSUE DETAILS</h3>
            <div className="problem-details__fact">
              <span className="problem-details__fact-label">Current Status</span>
              <span
                className={`status-pill status-pill--${problem.status
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
              >
                {problem.status.toUpperCase()}
              </span>
            </div>
            <div className="problem-details__fact">
              <span className="problem-details__fact-label">Community Votes</span>
              <span className="problem-details__fact-val">{problem.votes} votes</span>
            </div>
            <div className="problem-details__fact">
              <span className="problem-details__fact-label">City</span>
              <span className="problem-details__fact-val">{problem.city}</span>
            </div>
            <div className="problem-details__fact">
              <span className="problem-details__fact-label">Reported By</span>
              <span className="problem-details__fact-val">{problem.author}</span>
            </div>
          </div>

          <Link to="/problems" className="btn btn-outline-dark problem-details__back">
            ← BACK TO ALL PROBLEMS
          </Link>
        </aside>
      </div>
    </div>
  );
}
