/**
 * ====================================================================
 * CROWDSOLVE - EVAL 1
 * --------------------------------------------------------------------
 * File: useUserProblems.js
 * Contributor: Member 1 (Surbhi - Project Lead)
 * Description: Custom hook for managing user-created civic problems stored in localStorage.
 * ====================================================================
 */

//
// Kept separate from the mock data in src/data/problems.js so
// that file stays untouched. User-created problems are merged
// with mock data wherever problems are displayed.

import { useLocalStorage } from "./useLocalStorage";

export function useUserProblems() {
  const [userProblems, setUserProblems] = useLocalStorage(
    "crowdsolve_user_problems",
    []
  );

  function addProblem(problem) {
    setUserProblems([problem, ...userProblems]);
  }

  return { userProblems, addProblem };
}
