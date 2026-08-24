import VoteButton from "./VoteButton";
import "./SolutionCard.css";

export default function SolutionCard({ solution, isTop = false }) {
  return (
    <article className={`solution-card ${isTop ? "solution-card--top" : ""}`}>
      {isTop && <p className="solution-card__badge">★ TOP COMMUNITY SOLUTION</p>}

      <h3 className="solution-card__title">{solution.title}</h3>
      <p className="solution-card__desc">{solution.description}</p>

      <div className="solution-card__footer">
        <div className="solution-card__author">
          <span className="solution-card__avatar">
            {solution.author.charAt(0)}
          </span>
          <div>
            <p className="solution-card__author-name">{solution.author}</p>
            <p className="solution-card__date">{solution.date}</p>
          </div>
        </div>

        <div className="solution-card__actions">
          <VoteButton
            itemKey={solution.id}
            startUpvotes={solution.upvotes}
            startDownvotes={solution.downvotes}
          />
          <span className="solution-card__comments">
            💬 {solution.comments} Comments
          </span>
        </div>
      </div>
    </article>
  );
}
