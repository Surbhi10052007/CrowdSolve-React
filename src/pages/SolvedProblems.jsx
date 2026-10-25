// SolvedProblems.jsx — Showcase page for civic problems that have been
// successfully resolved by the community.
//
// Features:
//  - Sticky city-filter tabs (dropdown on mobile) to filter by city
//  - Problems grouped by city when "All" is selected
//  - Card layout with hero image; falls back to placehold.co when imageUrl
//    is empty or null
//  - Animated card hover, smooth fade-in

import { useState, useMemo } from "react";
import { solvedProblems, solvedCities, PLACEHOLDER } from "../data/solvedProblems";
import "./SolvedProblems.css";

// City flag emoji mapping for visual flair
const CITY_FLAGS = {
  Delhi: "🏛️",
  Mumbai: "🌊",
  Bengaluru: "💻",
  Chandigarh: "🌳",
  Pune: "🎓",
  Hyderabad: "🔮",
  Jaipur: "🏰",
};

// ─── Sub-component: Individual solved problem card ─────────────────────────
function SolvedCard({ problem }) {
  const hasImage = Boolean(problem.imageUrl);
  const imgSrc = hasImage ? problem.imageUrl : PLACEHOLDER;

  return (
    <article className="solved-card" id={`solved-problem-${problem.id}`}>
      <div className={`solved-card__image-wrap${hasImage ? "" : " is-placeholder"}`}>
        <img
          src={imgSrc}
          alt={hasImage ? problem.problemTitle : "No image available"}
          className="solved-card__image"
          loading="lazy"
          onError={(e) => {
            // If an external URL fails to load, fall back to placeholder
            e.currentTarget.src = PLACEHOLDER;
            e.currentTarget.parentElement.classList.add("is-placeholder");
          }}
        />
        <span className="solved-card__badge" aria-label="Solved">
          ✓ Solved
        </span>
      </div>

      <div className="solved-card__body">
        <span className="solved-card__city-tag">
          {CITY_FLAGS[problem.city] ?? "📍"} {problem.city}
        </span>
        <h3 className="solved-card__title">{problem.problemTitle}</h3>
        <p className="solved-card__description">{problem.description}</p>
      </div>
    </article>
  );
}

// ─── Sub-component: One city section (heading + grid of cards) ─────────────
function CitySection({ city, problems }) {
  return (
    <section
      className="solved-page__city-section"
      aria-labelledby={`city-heading-${city.replace(/\s+/g, "-").toLowerCase()}`}
    >
      <div className="solved-page__city-heading">
        <h2
          className="solved-page__city-name"
          id={`city-heading-${city.replace(/\s+/g, "-").toLowerCase()}`}
        >
          {CITY_FLAGS[city] ?? "📍"} {city}
        </h2>
        <span className="solved-page__city-count">
          {problems.length} {problems.length === 1 ? "problem" : "problems"} solved
        </span>
      </div>

      <div className="solved-page__grid">
        {problems.map((p) => (
          <SolvedCard key={p.id} problem={p} />
        ))}
      </div>
    </section>
  );
}

// ─── Main Page Component ────────────────────────────────────────────────────
export default function SolvedProblems() {
  const [activeCity, setActiveCity] = useState("All");

  // Filter problems based on city selection
  const filtered = useMemo(
    () =>
      activeCity === "All"
        ? solvedProblems
        : solvedProblems.filter((p) => p.city === activeCity),
    [activeCity]
  );

  // Group filtered list by city (for the "All" view)
  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach((p) => {
      if (!map[p.city]) map[p.city] = [];
      map[p.city].push(p);
    });
    return map;
  }, [filtered]);

  const cityList = activeCity === "All" ? Object.keys(grouped) : [activeCity];
  const totalSolved = solvedProblems.length;
  const totalCities = solvedCities.length;

  return (
    <>
      {/* ── SEO ── */}
      <title>Solved Problems — CrowdSolve</title>
      <meta
        name="description"
        content="Explore civic problems that have been successfully resolved through community action on CrowdSolve. Filtered by city."
      />

      {/* ── Hero Header ── */}
      <header className="solved-page__header">
        <div className="container">
          <p className="eyebrow">Community Victories</p>
          <h1 className="solved-page__title">
            Problems We've <span>Solved</span>
          </h1>
          <p className="solved-page__subtitle">
            Every listing below started as a complaint and became a victory. Browse
            real civic wins achieved by residents across India.
          </p>

          <div className="solved-page__stats-strip" aria-label="Impact summary">
            <div className="solved-page__stat">
              <span className="solved-page__stat-value">{totalSolved}</span>
              <span className="solved-page__stat-label">Problems Resolved</span>
            </div>
            <div className="solved-page__stat">
              <span className="solved-page__stat-value">{totalCities}</span>
              <span className="solved-page__stat-label">Cities Impacted</span>
            </div>
            <div className="solved-page__stat">
              <span className="solved-page__stat-value">100%</span>
              <span className="solved-page__stat-label">Community-driven</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Sticky City Filter Bar ── */}
      <div className="solved-page__controls" role="navigation" aria-label="Filter by city">
        <div className="container solved-page__controls-inner">
          <span className="solved-page__controls-label">Filter by city:</span>

          {/* Tab row — hidden on small screens */}
          <div className="solved-page__city-tabs" role="tablist">
            {["All", ...solvedCities].map((city) => (
              <button
                key={city}
                role="tab"
                aria-selected={activeCity === city}
                id={`city-tab-${city.toLowerCase()}`}
                className={`solved-page__city-tab${activeCity === city ? " is-active" : ""}`}
                onClick={() => setActiveCity(city)}
              >
                {city !== "All" && (CITY_FLAGS[city] ?? "📍") + " "}
                {city}
              </button>
            ))}
          </div>

          {/* Dropdown — visible on small screens */}
          <select
            className="solved-page__city-dropdown"
            value={activeCity}
            onChange={(e) => setActiveCity(e.target.value)}
            aria-label="Select city"
            id="city-filter-dropdown"
          >
            {["All", ...solvedCities].map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Main Content ── */}
      <main id="solved-main-content" className="solved-page__body">
        <div className="container">
          {/* Results count bar */}
          <div className="solved-page__results-bar">
            <p className="solved-page__results-count">
              Showing <strong>{filtered.length}</strong>{" "}
              {filtered.length === 1 ? "solved problem" : "solved problems"}
              {activeCity !== "All" && ` in ${activeCity}`}
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="solved-page__empty" role="status">
              <div className="solved-page__empty-icon">🔍</div>
              <h2 className="solved-page__empty-title">No results found</h2>
              <p className="solved-page__empty-desc">
                No solved problems for this city yet. Check back soon!
              </p>
            </div>
          ) : (
            cityList.map((city) => (
              <CitySection key={city} city={city} problems={grouped[city] ?? []} />
            ))
          )}
        </div>
      </main>
    </>
  );
}
