/**
 * ====================================================================
 * CROWDSOLVE - EVAL 1
 * --------------------------------------------------------------------
 * File: ProblemList.jsx
 * Contributor: Member 2 (Shubhleen Kaur - Frontend & UI Components)
 * Description: Responsive grid container for displaying a list of problem cards with empty state fallback.
 * ====================================================================
 */

import ProblemCard from "./ProblemCard";
import "./ProblemList.css";

export default function ProblemList({ problems, emptyMessage }) {
  if (problems.length === 0) {
    return (
      <p className="problem-list__empty">
        {emptyMessage || "No problems found."}
      </p>
    );
  }

  return (
    <div className="problem-list">
      {problems.map((problem) => (
        <ProblemCard key={problem.id} problem={problem} />
      ))}
    </div>
  );
}
