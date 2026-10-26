import "./RecentActivity.css";

const EVENT_CONFIG = {
  problem_reported: { icon: "📋", color: "var(--color-lime)" },
  upvoted:          { icon: "👍", color: "var(--color-coral)" },
  vote_removed:     { icon: "↩️", color: "var(--color-muted-dark)" },
  comment_added:    { icon: "💬", color: "#5a9cf5" },
  bookmarked:       { icon: "🔖", color: "#f59e0b" },
  status_changed:   { icon: "🔄", color: "#3aaf5c" },
};

function formatTimestamp(ts) {
  try {
    const d = new Date(ts);
    return d.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
  } catch {
    return ts;
  }
}

export default function RecentActivity({ events = [], maxItems = 10 }) {
  const visible = events.slice(0, maxItems);

  if (visible.length === 0) {
    return (
      <div className="recent-activity recent-activity--empty">
        <div className="recent-activity__empty-icon">⚡</div>
        <p>No activity recorded yet.</p>
        <p className="recent-activity__empty-hint">
          Start by upvoting a problem, posting a comment, or bookmarking something!
        </p>
      </div>
    );
  }

  return (
    <ul className="recent-activity" aria-label="Recent community activity">
      {visible.map((event) => {
        const cfg = EVENT_CONFIG[event.type] || { icon: "📌", color: "var(--color-muted-dark)" };
        return (
          <li key={event.id} className="recent-activity__item">
            <span
              className="recent-activity__dot"
              style={{ background: cfg.color }}
              aria-hidden="true"
            >
              {cfg.icon}
            </span>
            <div className="recent-activity__content">
              <p className="recent-activity__label">{event.label}</p>
              {event.city && (
                <span className="recent-activity__tag">📍 {event.city}</span>
              )}
              <span className="recent-activity__time">
                {formatTimestamp(event.timestamp)}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
