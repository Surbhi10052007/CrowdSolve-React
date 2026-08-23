/**
 * ====================================================================
 * CROWDSOLVE - EVAL 1
 * --------------------------------------------------------------------
 * File: useVote.js
 * Contributor: Member 1 (Surbhi - Project Lead)
 * Description: Custom hook managing upvote/downvote actions and vote counts with localStorage persistence.
 * ====================================================================
 */

//
// Remembers the visitor's vote in localStorage so refreshing the
// page doesn't let them vote twice.  Clicking the same button
// again removes the vote (toggle behaviour).

import { useLocalStorage } from "./useLocalStorage";

export function useVote(itemKey, startUpvotes, startDownvotes) {
  const [voteData, setVoteData] = useLocalStorage(`vote_${itemKey}`, {
    upvotes: startUpvotes,
    downvotes: startDownvotes,
    userVote: null, // "up" | "down" | null
  });

  function vote(direction) {
    // Clicking the same button removes the vote.
    if (voteData.userVote === direction) {
      setVoteData({
        ...voteData,
        upvotes: direction === "up" ? voteData.upvotes - 1 : voteData.upvotes,
        downvotes: direction === "down" ? voteData.downvotes - 1 : voteData.downvotes,
        userVote: null,
      });
      return;
    }

    let { upvotes, downvotes } = voteData;

    // Remove previous vote first (if switching from up to down or vice-versa).
    if (voteData.userVote === "up") upvotes -= 1;
    if (voteData.userVote === "down") downvotes -= 1;

    // Add the new vote.
    if (direction === "up") upvotes += 1;
    if (direction === "down") downvotes += 1;

    setVoteData({ upvotes, downvotes, userVote: direction });
  }

  return { voteData, vote };
}
