import { useState, useEffect, useMemo } from "react";
import { useProblems } from "../hooks/useProblemsContext";
import { cities } from "../data/cities";
import StatCard from "../components/StatCard";
import CategoryChart from "../components/CategoryChart";
import StatusBreakdown from "../components/StatusBreakdown";
import RecentActivity from "../components/RecentActivity";
import "./ImpactDashboard.css";

const ALL_CATEGORIES = ["Civic", "Environment", "Education", "Technology", "Community", "Campus", "Health"];

const ALL_STATUSES = ["Proposed", "Voted", "In Progress", "Implemented"];

export default function ImpactDashboard() {
  const { problems, totalCommentCount, activityLog } = useProblems();

  const [selectedCity, setSelectedCity] = useState("All");

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setLoadError(null);
    const timer = setTimeout(() => {

      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, [selectedCity]);

  const filteredProblems = useMemo(() => {
    if (selectedCity === "All") return problems;
    return problems.filter((p) => p.city === selectedCity);
  }, [problems, selectedCity]);

  const totalProblems = filteredProblems.length;
  const implementedCount = filteredProblems.filter((p) => p.status === "Implemented").length;
  const inProgressCount  = filteredProblems.filter((p) => p.status === "In Progress").length;
  const totalVotes = filteredProblems.reduce((sum, p) => sum + (p.votes || 0), 0);
  const resolutionRate = totalProblems > 0
    ? Math.round((implementedCount / totalProblems) * 100)
    : 0;

  const categoryData = useMemo(() => {
    return ALL_CATEGORIES
      .map((cat) => ({
        label: cat,
        count: filteredProblems.filter((p) => p.category === cat).length,
      }))
      .filter((d) => d.count > 0)
      .sort((a, b) => b.count - a.count);
  }, [filteredProblems]);

  const statusData = useMemo(() => {
    return ALL_STATUSES.map((status) => {
      const count = filteredProblems.filter((p) => p.status === status).length;
      const pct = totalProblems > 0 ? Math.round((count / totalProblems) * 100) : 0;
      return { status, count, pct };
    });
  }, [filteredProblems, totalProblems]);

  const cityData = useMemo(() => {
    return cities.map((city) => ({
      city,
      count: problems.filter((p) => p.city === city).length,
    })).sort((a, b) => b.count - a.count);
  }, [problems]);

  const filteredActivity = useMemo(() => {
    if (selectedCity === "All") return activityLog;
    return activityLog.filter((e) => !e.city || e.city === selectedCity);
  }, [activityLog, selectedCity]);

  return (
    <div className="impact-dashboard">

      <section className="impact-dashboard__header">
        <div className="container">
          <p className="eyebrow">COMMUNITY IMPACT</p>
          <h1 className="impact-dashboard__title">Progress, made together.</h1>
          <p className="impact-dashboard__subtitle">
            Live analytics derived from real community data — every vote, comment, and resolved problem counted here.
          </p>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">

          <div className="impact-dashboard__city-filter">
            <span className="impact-dashboard__filter-label">Filter by City:</span>
            <div className="impact-dashboard__filter-chips" role="group" aria-label="Filter by city">
              <button
                type="button"
                className={`filter-chip ${selectedCity === "All" ? "is-active" : ""}`}
                onClick={() => setSelectedCity("All")}
              >
                All Cities
              </button>
              {cities.map((city) => (
                <button
                  key={city}
                  type="button"
                  className={`filter-chip ${selectedCity === city ? "is-active" : ""}`}
                  onClick={() => setSelectedCity(city)}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="impact-dashboard__loading" aria-live="polite" aria-busy="true">
              <div className="impact-dashboard__spinner" />
              <p>Loading {selectedCity === "All" ? "platform" : selectedCity} analytics...</p>
            </div>
          ) : loadError ? (
            <div className="impact-dashboard__error" role="alert">
              <p>⚠️ {loadError}</p>
              <button type="button" className="btn btn-primary" onClick={() => setSelectedCity(selectedCity)}>
                Retry ↺
              </button>
            </div>
          ) : (
            <>

              <div className="impact-dashboard__stat-grid">
                <StatCard icon="📋" value={totalProblems} label="Total Problems Reported" accent="var(--color-lime)" />
                <StatCard icon="✅" value={implementedCount} label="Problems Implemented" accent="#3aaf5c" />
                <StatCard icon="⚙️" value={inProgressCount} label="In Progress" accent="#5a9cf5" />
                <StatCard icon="👍" value={totalVotes.toLocaleString()} label="Community Votes" accent="var(--color-coral)" />
                <StatCard icon="💬" value={totalCommentCount} label="Comments & Suggestions" accent="#c084fc" />
                <StatCard icon="🎯" value={`${resolutionRate}%`} label="Resolution Rate" accent="#f59e0b" />
              </div>

              <div className="impact-dashboard__charts-row">

                <div className="impact-dashboard__panel">
                  <h2 className="impact-dashboard__panel-title">Problems by Category</h2>
                  <p className="impact-dashboard__panel-sub">
                    {selectedCity === "All" ? "Across all cities" : `In ${selectedCity}`} · {filteredProblems.length} total
                  </p>
                  <CategoryChart data={categoryData} />
                </div>

                <div className="impact-dashboard__panel">
                  <h2 className="impact-dashboard__panel-title">Status Distribution</h2>
                  <p className="impact-dashboard__panel-sub">
                    Proportion of problems at each stage
                  </p>
                  <StatusBreakdown data={statusData} />

                  <div className="impact-dashboard__resolution-callout">
                    <span className="impact-dashboard__resolution-value">{resolutionRate}%</span>
                    <span className="impact-dashboard__resolution-label">
                      Resolution Rate
                      <small>{implementedCount} of {totalProblems} problems fully implemented</small>
                    </span>
                  </div>
                </div>
              </div>

              <div className="impact-dashboard__panel impact-dashboard__panel--city">
                <h2 className="impact-dashboard__panel-title">City-Wise Problem Report</h2>
                <p className="impact-dashboard__panel-sub">
                  Number of problems reported per city across the platform
                </p>
                <div className="impact-dashboard__city-table">
                  <div className="impact-dashboard__city-row impact-dashboard__city-row--header">
                    <span>City</span>
                    <span>Problems</span>
                    <span>Distribution</span>
                  </div>
                  {cityData.map(({ city, count }) => {
                    const maxCityCount = Math.max(...cityData.map((c) => c.count), 1);
                    const pct = Math.round((count / maxCityCount) * 100);
                    return (
                      <div key={city} className="impact-dashboard__city-row">
                        <button
                          type="button"
                          className={`impact-dashboard__city-name ${selectedCity === city ? "is-selected" : ""}`}
                          onClick={() => setSelectedCity(city === selectedCity ? "All" : city)}
                          aria-pressed={selectedCity === city}
                          title={`Filter by ${city}`}
                        >
                          {city}
                        </button>
                        <span className="impact-dashboard__city-count">{count}</span>
                        <div className="impact-dashboard__city-bar-track">
                          <div
                            className="impact-dashboard__city-bar"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="impact-dashboard__panel">
                <h2 className="impact-dashboard__panel-title">Recent Community Activity</h2>
                <p className="impact-dashboard__panel-sub">
                  Latest interactions recorded on the platform
                  {selectedCity !== "All" ? ` in ${selectedCity}` : ""}
                </p>
                <RecentActivity events={filteredActivity} maxItems={12} />
              </div>

              <div className="impact-dashboard__cta">
                <div className="impact-dashboard__cta-inner">
                  <h2 className="impact-dashboard__cta-heading">Every report is a step forward.</h2>
                  <p className="impact-dashboard__cta-desc">
                    Join thousands of citizens already making their communities better — one problem at a time.
                  </p>
                  <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <a href="/post" className="btn btn-primary">POST A PROBLEM +</a>
                    <a href="/problems" className="btn btn-outline-light">BROWSE PROBLEMS →</a>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
