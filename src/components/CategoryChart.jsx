// CategoryChart.jsx — Horizontal CSS bar chart showing problems per category.
// No third-party charting library — pure CSS bars that match the design system.
// Props: data = [{ label, count, total }]

import "./CategoryChart.css";

const CATEGORY_COLORS = {
  Civic:       "var(--color-lime)",
  Environment: "#4db8a0",
  Education:   "#5a9cf5",
  Technology:  "#e07a4f",
  Community:   "#c084fc",
  Campus:      "#f59e0b",
  Health:      "#f472b6",
};

export default function CategoryChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="category-chart category-chart--empty">
        <p>No data available for this selection.</p>
      </div>
    );
  }

  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="category-chart" role="list" aria-label="Problems by category">
      {data.map(({ label, count }) => {
        const pct = Math.round((count / maxCount) * 100);
        const color = CATEGORY_COLORS[label] || "var(--color-coral)";
        return (
          <div key={label} className="category-chart__row" role="listitem">
            <span className="category-chart__label">{label}</span>
            <div
              className="category-chart__bar-track"
              aria-label={`${label}: ${count} problem${count !== 1 ? "s" : ""}`}
            >
              <div
                className="category-chart__bar"
                style={{ width: `${pct}%`, background: color }}
              />
            </div>
            <span className="category-chart__count">{count}</span>
          </div>
        );
      })}
    </div>
  );
}
