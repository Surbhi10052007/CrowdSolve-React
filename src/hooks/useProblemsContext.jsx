import { createContext, useContext, useState, useCallback } from "react";
import { problems as initialProblems } from "../data/problems";
import { solutions as initialSolutions, getSolutionScore } from "../data/solutions";
import { seedComments } from "../data/comments";
import { useLocalStorage } from "./useLocalStorage";
import { useToast } from "./useToast";

const ProblemContext = createContext(null);

function buildSeedComments() {
  const map = {};
  Object.entries(seedComments).forEach(([pid, list]) => {
    map[Number(pid)] = list;
  });
  return map;
}

export function ProblemProvider({ children }) {
  const { addToast } = useToast();

  const [allProblems, setAllProblems] = useLocalStorage(
    "crowdsolve_all_problems",
    initialProblems
  );
  const [allSolutions, setAllSolutions] = useLocalStorage(
    "crowdsolve_all_solutions",
    initialSolutions
  );

  const [userVotes, setUserVotes] = useLocalStorage("crowdsolve_user_votes", {});

  const [bookmarks, setBookmarks] = useLocalStorage("crowdsolve_bookmarks", []);

  const [allComments, setAllComments] = useLocalStorage(
    "crowdsolve_comments",
    buildSeedComments()
  );

  const [activityLog, setActivityLog] = useLocalStorage("crowdsolve_activity", []);

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const logActivity = useCallback((event) => {
    setActivityLog((prev) =>
      [{ ...event, id: Date.now(), timestamp: new Date().toISOString() }, ...prev].slice(0, 50)
    );
  }, [setActivityLog]);

  const addProblem = useCallback((newProblem) => {
    setAllProblems((prev) => [newProblem, ...prev]);
    logActivity({ type: "problem_reported", label: `New problem reported: "${newProblem.title}"`, city: newProblem.city });
  }, [setAllProblems, logActivity]);

  const updateProblemStatus = useCallback((problemId, newStatus) => {
    setAllProblems((prev) =>
      prev.map((prob) =>
        prob.id === Number(problemId) ? { ...prob, status: newStatus } : prob
      )
    );
    logActivity({ type: "status_changed", label: `Problem status changed to "${newStatus}"`, problemId: Number(problemId) });
    addToast(`Problem status updated to "${newStatus}"`, "info");
  }, [setAllProblems, addToast, logActivity]);

  const deleteProblem = useCallback((problemId) => {
    setAllProblems((prev) => prev.filter((p) => p.id !== Number(problemId)));
    setAllSolutions((prev) => prev.filter((s) => s.problemId !== Number(problemId)));
    setBookmarks((prev) => prev.filter((id) => id !== Number(problemId)));
    addToast("Problem removed from platform", "warning");
  }, [setAllProblems, setAllSolutions, setBookmarks, addToast]);

  const voteProblem = useCallback((problemId, direction) => {
    setAllProblems((prev) =>
      prev.map((prob) => {
        if (prob.id !== Number(problemId)) return prob;
        const delta = direction === "up" ? 1 : -1;
        return { ...prob, votes: Math.max(0, prob.votes + delta) };
      })
    );
  }, [setAllProblems]);

  const toggleUpvote = useCallback((problemId) => {
    const pid = Number(problemId);
    const hasVoted = userVotes[pid] === "up";

    if (hasVoted) {

      setUserVotes((prev) => { const n = { ...prev }; delete n[pid]; return n; });
      voteProblem(pid, "down");
      logActivity({ type: "vote_removed", label: `Removed upvote from problem #${pid}`, problemId: pid });
      addToast("Upvote removed", "info");
    } else {

      setUserVotes((prev) => ({ ...prev, [pid]: "up" }));
      voteProblem(pid, "up");
      logActivity({ type: "upvoted", label: `Upvoted a community problem`, problemId: pid });
      addToast("Problem upvoted! 👍", "success");
    }

    return !hasVoted;
  }, [userVotes, setUserVotes, voteProblem, addToast, logActivity]);

  const toggleBookmark = useCallback((problemId) => {
    const pid = Number(problemId);
    const isBookmarked = bookmarks.includes(pid);
    if (isBookmarked) {
      setBookmarks((prev) => prev.filter((id) => id !== pid));
      addToast("Removed from watchlist", "info");
    } else {
      setBookmarks((prev) => [...prev, pid]);
      logActivity({ type: "bookmarked", label: `Saved a problem to watchlist`, problemId: pid });
      addToast("Added to your watchlist! 🔖", "success");
    }
    return !isBookmarked;
  }, [bookmarks, setBookmarks, addToast, logActivity]);

  const isBookmarked = useCallback((problemId) => {
    return bookmarks.includes(Number(problemId));
  }, [bookmarks]);

  const bookmarkedProblems = allProblems.filter((p) => bookmarks.includes(p.id));

  const getComments = useCallback((problemId) => {
    return allComments[Number(problemId)] || [];
  }, [allComments]);

  const addComment = useCallback((problemId, commentObj) => {
    const pid = Number(problemId);
    setAllComments((prev) => ({
      ...prev,
      [pid]: [commentObj, ...(prev[pid] || [])],
    }));
    logActivity({ type: "comment_added", label: `New comment posted on problem #${pid}`, problemId: pid });
  }, [setAllComments, logActivity]);

  const deleteComment = useCallback((problemId, commentId) => {
    const pid = Number(problemId);
    setAllComments((prev) => ({
      ...prev,
      [pid]: (prev[pid] || []).filter((c) => c.id !== commentId),
    }));
  }, [setAllComments]);

  const totalCommentCount = Object.values(allComments).reduce(
    (sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0),
    0
  );

  const addSolution = useCallback((newSolution) => {
    setAllSolutions((prev) => [newSolution, ...prev]);
    setAllProblems((prev) =>
      prev.map((prob) =>
        prob.id === Number(newSolution.problemId)
          ? { ...prob, solutions: (prob.solutions || 0) + 1 }
          : prob
      )
    );
    addToast("Your solution was proposed to the community!", "success");
  }, [setAllSolutions, setAllProblems, addToast]);

  const getProblemSolutions = useCallback((problemId) => {
    return allSolutions.filter((s) => s.problemId === Number(problemId));
  }, [allSolutions]);

  const getTopSolutionForProblem = useCallback((problemId) => {
    const solList = allSolutions.filter((s) => s.problemId === Number(problemId));
    if (solList.length === 0) return null;
    return [...solList].sort((a, b) => getSolutionScore(b) - getSolutionScore(a))[0];
  }, [allSolutions]);

  const refreshData = useCallback(() => {
    setIsLoading(true);
    setApiError(null);
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  }, []);

  const value = {

    problems: allProblems,
    solutions: allSolutions,
    isLoading,
    apiError,
    addProblem,
    updateProblemStatus,
    deleteProblem,
    voteProblem,
    addSolution,
    getProblemSolutions,
    getTopSolutionForProblem,
    refreshData,

    userVotes,
    toggleUpvote,

    bookmarks,
    bookmarkedProblems,
    toggleBookmark,
    isBookmarked,

    allComments,
    getComments,
    addComment,
    deleteComment,
    totalCommentCount,

    activityLog,
  };

  return <ProblemContext.Provider value={value}>{children}</ProblemContext.Provider>;
}

export function useProblems() {
  const context = useContext(ProblemContext);
  if (!context) {
    throw new Error("useProblems must be used within a ProblemProvider");
  }
  return context;
}
