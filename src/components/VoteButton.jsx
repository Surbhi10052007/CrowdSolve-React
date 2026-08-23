/**
 * ====================================================================
 * CROWDSOLVE - EVAL 1
 * --------------------------------------------------------------------
 * File: VoteButton.jsx
 * Contributor: Member 2 (Shubhleen Kaur - Frontend & UI Components)
 * Description: Interactive voting widget with upvote/downvote toggle states and animated count display.
 * ====================================================================
 */

import { useVote } from "../hooks/useVote";
import "./VoteButton.css";

export default function VoteButton({ itemKey, startUpvotes, startDownvotes }) {
  const { voteData, vote } = useVote(itemKey, startUpvotes, startDownvotes);

  return (
    <div className="vote-button">
      <button
        type="button"
        className={`vote-button__btn ${voteData.userVote === "up" ? "is-active-up" : ""}`}
        onClick={() => vote("up")}
        aria-pressed={voteData.userVote === "up"}
        aria-label="Upvote this solution"
      >
        ↑ {voteData.upvotes}
      </button>
      <button
        type="button"
        className={`vote-button__btn ${voteData.userVote === "down" ? "is-active-down" : ""}`}
        onClick={() => vote("down")}
        aria-pressed={voteData.userVote === "down"}
        aria-label="Downvote this solution"
      >
        ↓ {voteData.downvotes}
      </button>
    </div>
  );
}
