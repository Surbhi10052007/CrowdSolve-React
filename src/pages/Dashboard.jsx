// Dashboard.jsx — User dashboard showing karma, stats, and activity log.
// Protected by ProtectedRoute (user must be logged in).

import { useAuth } from "../hooks/useAuth";
import "./Dashboard.css";

export default function Dashboard() {
  const { currentUser, getLevel } = useAuth();

  // ProtectedRoute guarantees currentUser exists, but this extra
  // check keeps the component safe if used standalone.
  if (!currentUser) return null;

  const level = getLevel(currentUser.karma);

  return (
    <div className="dashboard">
      <section className="dashboard__header">
        <div className="container">
          <p className="eyebrow">WELCOME BACK</p>
          <h1>{currentUser.name.toUpperCase()}</h1>
          <p className="dashboard__level">{level}</p>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          {/* Stat cards */}
          <div className="dashboard__stats">
            <div className="dashboard__stat">
              <p className="dashboard__stat-value">{currentUser.karma.toLocaleString()}</p>
              <p className="dashboard__stat-label">KARMA</p>
            </div>
            <div className="dashboard__stat">
              <p className="dashboard__stat-value">{currentUser.problemsPosted}</p>
              <p className="dashboard__stat-label">PROBLEMS</p>
            </div>
            <div className="dashboard__stat">
              <p className="dashboard__stat-value">{currentUser.solutionsSubmitted}</p>
              <p className="dashboard__stat-label">SOLUTIONS</p>
            </div>
            <div className="dashboard__stat">
              <p className="dashboard__stat-value">{currentUser.implementedCount}</p>
              <p className="dashboard__stat-label">IMPLEMENTED</p>
            </div>
          </div>

          {/* Activity log */}
          <div className="dashboard__activity">
            <h2>RECENT ACTIVITY</h2>
            {currentUser.activity.length === 0 ? (
              <p className="dashboard__empty">
                No activity yet. Post a problem or propose a solution to start earning karma.
              </p>
            ) : (
              <ul className="dashboard__activity-list">
                {currentUser.activity.map((item, index) => (
                  <li key={index} className="dashboard__activity-item">
                    <span>{item.text}</span>
                    <span className="dashboard__activity-points">
                      +{item.points} KARMA
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
