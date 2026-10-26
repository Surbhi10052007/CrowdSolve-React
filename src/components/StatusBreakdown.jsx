import "./StatusBreakdown.css";

const STATUS_CONFIG = {
  "Proposed":    { color: "var(--color-lime-dim)",  icon: "💡" },
  "Voted":       { color: "var(--color-coral)",      icon: "👍" },
  "In Progress": { color: "#5a9cf5",                 icon: "⚙️" },
  "Implemented": { color: "#3aaf5c",                 icon: "✅" },
};

export default function StatusBreakdown({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="status-breakdown status-breakdown--empty">
        <p>No data available.</p>
      </div>
    );
  }

  return (
    <div className="status-breakdown">
      {data.map(({ status, count, pct }) => {
        const cfg = STATUS_CONFIG[status] || { color: "var(--color-muted-dark)", icon: "📌" };
        return (
          <div key={status} className="status-breakdown__row">
            <span className="status-breakdown__icon" aria-hidden="true">{cfg.icon}</span>
            <div className="status-breakdown__info">
              <div className="status-breakdown__top">
                <span className="status-breakdown__name">{status}</span>
                <span className="status-breakdown__count">{count}</span>
              </div>
              <div className="status-breakdown__track">
                <div
                  className="status-breakdown__bar"
                  style={{ width: `${pct}%`, background: cfg.color }}
                  role="progressbar"
                  aria-valuenow={pct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${status}: ${pct}%`}
                />
              </div>
              <span className="status-breakdown__pct">{pct}%</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
