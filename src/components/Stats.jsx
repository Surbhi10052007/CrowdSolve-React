// Stats.jsx — Impact and community statistics counter component.
// Demonstrates: Aggregated metric cards, responsive stats grid, and live counts.

import { problems as mockProblems } from "../data/problems";
import { useUserProblems } from "../hooks/useUserProblems";
import { cities } from "../data/cities";
import "./Stats.css";

export default function Stats({ customStats }) {
  const { userProblems } = useUserProblems();
  const allProblems = [...userProblems, ...mockProblems];

  // Calculate live statistics
  const totalProblems = allProblems.length;
  const totalVotes = allProblems.reduce((sum, p) => sum + (p.votes || 0), 0);
  const resolvedCount = allProblems.filter(
    (p) => p.status === "Implemented" || p.status === "In Progress"
  ).length;
  const activeCitiesCount = cities.length;

  const statItems = customStats || [
    {
      id: "problems",
      value: `${totalProblems}+`,
      label: "Issues Reported",
      desc: "Tracked across active communities",
      icon: "📢",
    },
    {
      id: "votes",
      value: totalVotes > 1000 ? `${(totalVotes / 1000).toFixed(1)}k+` : totalVotes,
      label: "Community Votes",
      desc: "Neighbors prioritizing solutions",
      icon: "🗳️",
    },
    {
      id: "cities",
      value: `${activeCitiesCount}`,
      label: "Active Cities",
      desc: "Growing civic networks",
      icon: "🏙️",
    },
    {
      id: "impact",
      value: `${resolvedCount}+`,
      label: "Active Solutions",
      desc: "In-progress & resolved actions",
      icon: "⚡",
    },
  ];

  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-header">
          <p className="eyebrow">OUR COLLECTIVE IMPACT</p>
          <h2 className="stats-title">REAL NUMBERS. REAL CHANGE.</h2>
          <p className="stats-subtitle">
            See how citizen collaboration is turning everyday neighborhood issues into organized community action.
          </p>
        </div>

        <div className="stats-grid">
          {statItems.map((item) => (
            <div key={item.id} className="stat-card">
              <div className="stat-card__icon-wrap">
                <span className="stat-card__icon">{item.icon}</span>
              </div>
              <div className="stat-card__body">
                <div className="stat-card__value">{item.value}</div>
                <div className="stat-card__label">{item.label}</div>
                <p className="stat-card__desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
