/**
 * ====================================================================
 * CROWDSOLVE - EVAL 1
 * --------------------------------------------------------------------
 * File: Stats.jsx
 * Contributor: Member 2 (Shubhleen Kaur - Frontend & UI Components)
 * Description: Live civic impact statistics component calculating dynamic problem counts, resolved issues, solution proposals, and category breakdowns.
 * ====================================================================
 */

import { useState } from "react";
import { problems as mockProblems } from "../data/problems";
import { solutions as mockSolutions } from "../data/solutions";
import { useUserProblems } from "../hooks/useUserProblems";
import "./Stats.css";

export default function Stats({ cityFilter = null }) {
  const { userProblems } = useUserProblems();
  const [activeMetricTab, setActiveMetricTab] = useState("overview");

  const allProblems = [...userProblems, ...mockProblems];
  const filteredProblems = cityFilter
    ? allProblems.filter((p) => p.city === cityFilter)
    : allProblems;

  const totalProblems = filteredProblems.length;
  const resolvedProblems = filteredProblems.filter(
    (p) => p.status.toLowerCase() === "resolved" || p.status.toLowerCase() === "implemented"
  ).length;
  const inProgressProblems = filteredProblems.filter(
    (p) => p.status.toLowerCase() === "in progress"
  ).length;
  const underReviewProblems = filteredProblems.filter(
    (p) => p.status.toLowerCase() === "proposed" || p.status.toLowerCase() === "voted"
  ).length;

  const totalVotes = filteredProblems.reduce((sum, p) => sum + (p.votes || 0), 0);
  const totalSolutions = mockSolutions.length;
  const resolutionRate = totalProblems > 0 ? Math.round((resolvedProblems / totalProblems) * 100) : 0;

  // Category breakdown
  const categoryCounts = filteredProblems.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  const statCards = [
    {
      id: "problems",
      label: "TOTAL CIVIC ISSUES",
      value: totalProblems,
      subtext: `${underReviewProblems} under active review`,
      icon: "📢",
    },
    {
      id: "resolved",
      label: "RESOLVED CASES",
      value: resolvedProblems,
      subtext: `${resolutionRate}% community resolution rate`,
      icon: "✅",
    },
    {
      id: "votes",
      label: "CITIZEN VOTES & VOICES",
      value: totalVotes.toLocaleString(),
      subtext: "Community prioritization score",
      icon: "🗳️",
    },
    {
      id: "solutions",
      label: "PROPOSED SOLUTIONS",
      value: totalSolutions,
      subtext: "Collaborative action blueprints",
      icon: "💡",
    },
  ];

  return (
    <section className="stats-section">
      <div className="stats-header">
        <div className="stats-header__text">
          <span className="stats-eyebrow">LIVE IMPACT TRACKER</span>
          <h2 className="stats-title">
            {cityFilter ? `${cityFilter.toUpperCase()} BY THE NUMBERS` : "COMMUNITY IMPACT AT A GLANCE"}
          </h2>
          <p className="stats-desc">
            Real-time transparency on civic engagement, issue resolutions, and neighbourhood participation.
          </p>
        </div>

        <div className="stats-tabs">
          <button
            type="button"
            className={`stats-tab ${activeMetricTab === "overview" ? "is-active" : ""}`}
            onClick={() => setActiveMetricTab("overview")}
          >
            Overview
          </button>
          <button
            type="button"
            className={`stats-tab ${activeMetricTab === "categories" ? "is-active" : ""}`}
            onClick={() => setActiveMetricTab("categories")}
          >
            By Category
          </button>
        </div>
      </div>

      {activeMetricTab === "overview" && (
        <div className="stats-grid">
          {statCards.map((card) => (
            <div key={card.id} className="stat-card">
              <div className="stat-card__top">
                <span className="stat-card__icon">{card.icon}</span>
                <span className="stat-card__trend">Live</span>
              </div>
              <div className="stat-card__number">{card.value}</div>
              <div className="stat-card__label">{card.label}</div>
              <div className="stat-card__subtext">{card.subtext}</div>
            </div>
          ))}
        </div>
      )}

      {activeMetricTab === "categories" && (
        <div className="stats-categories-grid">
          {Object.entries(categoryCounts).map(([category, count]) => {
            const percentage = totalProblems > 0 ? Math.round((count / totalProblems) * 100) : 0;
            return (
              <div key={category} className="category-stat-pill">
                <div className="category-stat-pill__header">
                  <span className="category-stat-pill__name">{category}</span>
                  <span className="category-stat-pill__count">{count} issues</span>
                </div>
                <div className="category-stat-pill__bar-bg">
                  <div
                    className="category-stat-pill__bar-fill"
                    style={{ width: `${Math.max(percentage, 10)}%` }}
                  />
                </div>
                <span className="category-stat-pill__percent">{percentage}% of total issues</span>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
