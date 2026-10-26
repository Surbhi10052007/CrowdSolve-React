import "./StatCard.css";

export default function StatCard({ icon, value, label, accent }) {
  return (
    <div className="stat-card" style={{ "--stat-accent": accent || "var(--color-lime)" }}>
      <div className="stat-card__icon" aria-hidden="true">{icon}</div>
      <p className="stat-card__value">{value}</p>
      <p className="stat-card__label">{label}</p>
    </div>
  );
}
