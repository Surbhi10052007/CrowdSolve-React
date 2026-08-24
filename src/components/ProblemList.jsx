import ProblemCard from "./ProblemCard";
import "./ProblemList.css";

export default function ProblemList({ problems, emptyMessage }) {
  if (problems.length === 0) {
    return (
      <p className="problem-list__empty">
        {emptyMessage || "No problems found."}
      </p>
    );
  }

  return (
    <div className="problem-list">
      {problems.map((problem) => (
        <ProblemCard key={problem.id} problem={problem} />
      ))}
    </div>
  );
}
