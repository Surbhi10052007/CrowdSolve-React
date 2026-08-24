/**
 * ============================================================================
 * File: CommunityLeaderboard.jsx
 * Project: CrowdSolve (Eval 1)
 * ============================================================================
 */

// ============================================================================
// MEMBER 1 (Project Lead - Surbhi): React Core Hooks & Context Dependencies
// ============================================================================
import { useState, useMemo } from "react";
import { useCity } from "../hooks/useCity";
import { useLocalStorage } from "../hooks/useLocalStorage";

// ============================================================================
// MEMBER 3 (Karan Kumar): Component Stylesheet Import
// ============================================================================
import "./CommunityLeaderboard.css";

// ============================================================================
// MEMBER 3 (Karan Kumar): Mock Community Contributor Data & Seed Profiles
// ============================================================================
const INITIAL_LEADERBOARD = [
  {
    id: "user-1",
    name: "Aarav Sharma",
    avatar: "👨‍💼",
    city: "Mumbai",
    karma: 1420,
    solved: 18,
    badge: "🌟 Top Solver",
    badgeType: "gold",
    weeklyKarma: 340,
    monthlyKarma: 820,
    cheers: 45
  },
  {
    id: "user-2",
    name: "Priya Patel",
    avatar: "👩‍🔬",
    city: "Bengaluru",
    karma: 1280,
    solved: 15,
    badge: "🌱 Eco Champion",
    badgeType: "green",
    weeklyKarma: 290,
    monthlyKarma: 760,
    cheers: 38
  },
  {
    id: "user-3",
    name: "Rohan Verma",
    avatar: "👨‍💻",
    city: "Delhi",
    karma: 1150,
    solved: 14,
    badge: "🛡️ Civic Guardian",
    badgeType: "blue",
    weeklyKarma: 210,
    monthlyKarma: 690,
    cheers: 29
  },
  {
    id: "user-4",
    name: "Ananya Iyer",
    avatar: "👩‍🎨",
    city: "Bengaluru",
    karma: 980,
    solved: 11,
    badge: "💡 Innovator",
    badgeType: "purple",
    weeklyKarma: 180,
    monthlyKarma: 530,
    cheers: 22
  },
  {
    id: "user-5",
    name: "Vikram Singh",
    avatar: "👨‍🏫",
    city: "Mumbai",
    karma: 890,
    solved: 9,
    badge: "⚡ Quick Responder",
    badgeType: "orange",
    weeklyKarma: 150,
    monthlyKarma: 480,
    cheers: 19
  },
  {
    id: "user-6",
    name: "Sneha Mukherjee",
    avatar: "👩‍⚕️",
    city: "Delhi",
    karma: 760,
    solved: 8,
    badge: "🤝 Active Resolver",
    badgeType: "teal",
    weeklyKarma: 120,
    monthlyKarma: 410,
    cheers: 15
  }
];

// ============================================================================
// MEMBER 3 (Karan Kumar): Main CommunityLeaderboard Component Function
// ============================================================================
export default function CommunityLeaderboard() {
  // ─── [MEMBER 1 CODE: Global City Context Consumer] ───
  const { selectedCity } = useCity();

  // ─── [MEMBER 3 CODE: State Hooks for Timeframe & Filter Toggles] ───
  const [timeframe, setTimeframe] = useState("all"); // "week" | "month" | "all"
  const [filterByCity, setFilterByCity] = useState(false);

  // ─── [MEMBER 1 & 3 CODE: Persistent LocalStorage State for User Cheers] ───
  const [cheeredUsers, setCheeredUsers] = useLocalStorage("crowdsolve_cheered_users", []);

  // ─── [MEMBER 3 CODE: Dynamic Sorting & City-Filtering Algorithm] ───
  const rankedList = useMemo(() => {
    let list = [...INITIAL_LEADERBOARD];

    // Filter by city if toggle is active and not "All Cities"
    if (filterByCity && selectedCity && selectedCity !== "All Cities") {
      list = list.filter((user) => user.city.toLowerCase() === selectedCity.toLowerCase());
    }

    // Sort contributors according to timeframe karma points
    list.sort((a, b) => {
      if (timeframe === "week") return b.weeklyKarma - a.weeklyKarma;
      if (timeframe === "month") return b.monthlyKarma - a.monthlyKarma;
      return b.karma - a.karma;
    });

    return list;
  }, [timeframe, filterByCity, selectedCity]);

  // ─── [MEMBER 3 CODE: Optimistic Cheer / Kudos Action Handler] ───
  const handleCheer = (userId) => {
    if (cheeredUsers.includes(userId)) return;
    setCheeredUsers([...cheeredUsers, userId]);
  };

  // ─── [MEMBER 2 & 3 CODE: Rank Badge & Medal UI Formatter] ───
  const getRankBadge = (index) => {
    if (index === 0) return <span className="leaderboard-rank rank-1">🥇 1st</span>;
    if (index === 1) return <span className="leaderboard-rank rank-2">🥈 2nd</span>;
    if (index === 2) return <span className="leaderboard-rank rank-3">🥉 3rd</span>;
    return <span className="leaderboard-rank rank-other">#{index + 1}</span>;
  };

  return (
    // ─── [MEMBER 2 CODE: Card Container Section Layout] ───
    <section className="leaderboard-card">
      
      {/* ─── [MEMBER 3 CODE: Leaderboard Header, Eyebrow & Description] ─── */}
      <div className="leaderboard-card__header">
        <div className="leaderboard-card__title-group">
          <span className="leaderboard-card__eyebrow">🏆 Civic Hall of Fame</span>
          <h2 className="leaderboard-card__title">Community Leaderboard</h2>
          <p className="leaderboard-card__desc">
            Recognizing citizens and leaders who report, vote, and solve real-world problems.
          </p>
        </div>

        {/* ─── [MEMBER 3 CODE: Timeframe Tab Controls & City Filter Switch] ─── */}
        <div className="leaderboard-card__controls">
          <div className="leaderboard-tabs" role="tablist">
            <button
              className={`leaderboard-tab ${timeframe === "week" ? "leaderboard-tab--active" : ""}`}
              onClick={() => setTimeframe("week")}
              type="button"
            >
              This Week
            </button>
            <button
              className={`leaderboard-tab ${timeframe === "month" ? "leaderboard-tab--active" : ""}`}
              onClick={() => setTimeframe("month")}
              type="button"
            >
              This Month
            </button>
            <button
              className={`leaderboard-tab ${timeframe === "all" ? "leaderboard-tab--active" : ""}`}
              onClick={() => setTimeframe("all")}
              type="button"
            >
              All Time
            </button>
          </div>

          {selectedCity && selectedCity !== "All Cities" && (
            <button
              className={`leaderboard-city-toggle ${filterByCity ? "leaderboard-city-toggle--active" : ""}`}
              onClick={() => setFilterByCity(!filterByCity)}
              type="button"
              title={`Filter by ${selectedCity}`}
            >
              📍 {filterByCity ? `Showing: ${selectedCity}` : `Filter by ${selectedCity}`}
            </button>
          )}
        </div>
      </div>

      {/* ─── [MEMBER 3 CODE: Contributor List & Dynamic Table Rows] ─── */}
      <div className="leaderboard-list">
        {rankedList.length === 0 ? (
          // ─── [MEMBER 3 CODE: Empty State When No Filter Results Match] ───
          <div className="leaderboard-empty">
            <p>No contributors found for {selectedCity} in this timeframe.</p>
          </div>
        ) : (
          rankedList.map((user, index) => {
            const isCheered = cheeredUsers.includes(user.id);
            const displayKarma =
              timeframe === "week"
                ? user.weeklyKarma
                : timeframe === "month"
                ? user.monthlyKarma
                : user.karma;

            return (
              <div
                key={user.id}
                className={`leaderboard-row ${index < 3 ? `leaderboard-row--top-${index + 1}` : ""}`}
              >
                {/* ─── [MEMBER 2 & 3 CODE: Rank Medal Column] ─── */}
                <div className="leaderboard-col-rank">{getRankBadge(index)}</div>

                {/* ─── [MEMBER 2 CODE: Contributor Avatar & Name Info] ─── */}
                <div className="leaderboard-col-user">
                  <span className="leaderboard-user-avatar" role="img" aria-label="avatar">
                    {user.avatar}
                  </span>
                  <div className="leaderboard-user-details">
                    <span className="leaderboard-user-name">{user.name}</span>
                    <span className="leaderboard-user-city">📍 {user.city}</span>
                  </div>
                </div>

                {/* ─── [MEMBER 2 CODE: Achievement Category Pill] ─── */}
                <div className="leaderboard-col-badge">
                  <span className={`leaderboard-badge badge--${user.badgeType}`}>
                    {user.badge}
                  </span>
                </div>

                {/* ─── [MEMBER 2 CODE: Solved Problems Counter] ─── */}
                <div className="leaderboard-col-stats">
                  <span className="stat-value">{user.solved}</span>
                  <span className="stat-label">Solved</span>
                </div>

                {/* ─── [MEMBER 1 & 3 CODE: Karma Points Calculation Display] ─── */}
                <div className="leaderboard-col-karma">
                  <span className="karma-count">✨ {displayKarma}</span>
                  <span className="karma-label">Karma</span>
                </div>

                {/* ─── [MEMBER 3 CODE: Interactive Kudos / Cheer Button] ─── */}
                <div className="leaderboard-col-action">
                  <button
                    className={`cheer-button ${isCheered ? "cheer-button--cheered" : ""}`}
                    onClick={() => handleCheer(user.id)}
                    disabled={isCheered}
                    type="button"
                    title={isCheered ? "You cheered this contributor!" : "Send a cheer"}
                  >
                    {isCheered ? "🎉 Cheered!" : `👏 Cheer (${user.cheers + (isCheered ? 1 : 0)})`}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
