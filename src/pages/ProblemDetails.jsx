/**
 * ====================================================================
 * CROWDSOLVE - EVAL 1
 * --------------------------------------------------------------------
 * File: ProblemDetails.jsx
 * Contributor: Member 2 (Shubhleen Kaur - Frontend & UI Components)
 * Description: Single problem view with breadcrumb header, StatusTracker, problem description, solutions listing, endorse button, share action, and comments section.
 * ====================================================================
 */

import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { getProblemById } from "../data/problems";
import { useUserProblems } from "../hooks/useUserProblems";
import { getSolutionsByProblemId, getSolutionScore } from "../data/solutions";
import SolutionCard from "../components/SolutionCard";
import StatusTracker from "../components/StatusTracker";
import CommentSection from "../components/CommentSection";
import "./ProblemDetails.css";

export default function ProblemDetails() {
  const { id } = useParams();
  const { userProblems } = useUserProblems();
  const [hasEndorsed, setHasEndorsed] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

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

  const currentVotes = (problem.votes || 0) + (hasEndorsed ? 1 : 0);

  function handleShare() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  }

  function handleEndorse() {
    setHasEndorsed(!hasEndorsed);
  }

  return (
    <div className="problem-details">
      {/* ──── Header banner ──── */}
      <div className="problem-details__banner">
        <div className="container">
          <nav className="problem-details__breadcrumbs" aria-label="Breadcrumb">
            <Link to="/problems">Problems</Link> / <span>{problem.city}</span> / <span>{problem.category}</span>
          </nav>
          
          <div className="problem-details__title-row">
            <div>
              <span className="problem-details__category">{problem.category}</span>
              <h1 className="problem-details__title">{problem.title}</h1>
            </div>
            <div className="problem-details__banner-actions">
              <button
                type="button"
                className={`problem-details__endorse-btn ${hasEndorsed ? "is-endorsed" : ""}`}
                onClick={handleEndorse}
              >
                {hasEndorsed ? "✓ ENDORSED" : "▲ ENDORSE ISSUE (+1)"}
              </button>
              <button
                type="button"
                className="problem-details__share-btn"
                onClick={handleShare}
              >
                {copiedLink ? "✓ Link Copied!" : "🔗 Share"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container problem-details__layout">
        {/* ──── Main content ──── */}
        <div className="problem-details__main">
          {/* Status Tracker */}
          <StatusTracker
            status={problem.status}
            updatedAt={problem.date || "Recently"}
          />

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

          {/* Proposed Solutions Section */}
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

          {/* Community Discussion Forum */}
          <CommentSection
            problemId={problem.id}
            problemTitle={problem.title}
          />
        </div>

        {/* ──── Sidebar ──── */}
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
              <span className="problem-details__fact-val">{currentVotes} votes</span>
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

          <div className="problem-details__card problem-details__tip-box">
            <h4 className="problem-details__tip-title">💡 How you can help</h4>
            <p className="problem-details__tip-desc">
              Review and vote on proposed solutions or add your local perspective in the community forum.
            </p>
          </div>

          <Link to="/problems" className="btn btn-outline-dark problem-details__back">
            ← BACK TO ALL PROBLEMS
          </Link>
        </aside>
      </div>
    </div>
  );
}
