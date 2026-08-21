// Problems.jsx — Problem listing page for Eval 1 (Light Theme).
// Demonstrates: useState, search filter, category filter, status filter.

import { useState } from "react";
import ProblemList from "../components/ProblemList";
import { useCity } from "../hooks/useCity";
import { useUserProblems } from "../hooks/useUserProblems";
import { problems as mockProblems } from "../data/problems";
import "./Problems.css";

const CATEGORIES = ["All", "Civic", "Environment", "Campus", "Education", "Technology", "Community"];
const STATUSES = ["All", "Proposed", "Voted", "In Progress", "Implemented"];

export default function Problems() {
  const { selectedCity } = useCity();
  const { userProblems } = useUserProblems();
  const problems = [...userProblems, ...mockProblems];

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  // Filtering chain: city → search → category → status
  const cityProblems = problems.filter((p) => p.city === selectedCity);

  const searchedProblems = cityProblems.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase())
  );

  const categoryProblems =
    category === "All"
      ? searchedProblems
      : searchedProblems.filter((p) => p.category === category);

  const finalProblems =
    status === "All"
      ? categoryProblems
      : categoryProblems.filter((p) => p.status === status);

  return (
    <div className="problems-page">
      <section className="problems-page__header">
        <div className="container">
          <p className="eyebrow">{selectedCity.toUpperCase()} DIRECTORY</p>
          <h1 className="problems-page__title">
            CIVIC ISSUES IN {selectedCity.toUpperCase()}
          </h1>
          <p className="problems-page__desc">
            Browse, search, and vote on community issues needing action.
          </p>
        </div>
      </section>

      <section className="section problems-page__content">
        <div className="container">
          <div className="problems-page__filters">
            {/* Search bar */}
            <input
              type="text"
              className="problems-page__search"
              placeholder="Search a problem, location, or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search problems"
            />

            {/* Category filter chips */}
            <div className="problems-page__filter-group" role="group" aria-label="Filter by category">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`filter-chip ${category === c ? "is-active" : ""}`}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Status filter chips */}
            <div className="problems-page__filter-group" role="group" aria-label="Filter by status">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`filter-chip ${status === s ? "is-active" : ""}`}
                  onClick={() => setStatus(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <p className="problems-page__count">
            Showing <strong>{finalProblems.length}</strong> issue{finalProblems.length !== 1 ? "s" : ""} in {selectedCity}
          </p>

          <ProblemList
            problems={finalProblems}
            emptyMessage={`No problems match your filters in ${selectedCity}.`}
          />
        </div>
      </section>
    </div>
  );
}
