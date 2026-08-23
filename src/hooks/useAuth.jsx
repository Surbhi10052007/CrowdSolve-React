/**
 * ====================================================================
 * CROWDSOLVE - EVAL 1
 * --------------------------------------------------------------------
 * File: useAuth.jsx
 * Contributor: Member 1 (Surbhi - Project Lead)
 * Description: Authentication context provider and custom hook managing user login, signup, logout, and karma points.
 * ====================================================================
 */

//
// This is a DEMO auth system for a college project.
// There is no real server or password hashing — everything lives
// in localStorage.  It demonstrates:
//   • Context API (createContext + useContext)
//   • Custom hooks
//   • State management with useLocalStorage
//   • A simple karma / reputation system

import { createContext, useContext } from "react";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext(null);

// Karma points awarded for different actions.
const KARMA_RULES = {
  problemPosted: 10,
  solutionProposed: 15,
  upvoteReceived: 5,
  winningSolution: 30,
};

// Determines user level based on total karma.
function getLevel(karma) {
  if (karma >= 1000) return "Change Maker";
  if (karma >= 500)  return "Community Builder";
  if (karma >= 200)  return "Problem Solver";
  if (karma >= 50)   return "Contributor";
  return "Newcomer";
}

export function AuthProvider({ children }) {
  // Mock "database" — list of all registered users.
  const [users, setUsers] = useLocalStorage("crowdsolve_users", []);

  // Email of the currently logged-in user (or null).
  const [currentUserEmail, setCurrentUserEmail] = useLocalStorage(
    "crowdsolve_current_user",
    null
  );

  // Find the full user object from the users array.
  const currentUser = users.find((u) => u.email === currentUserEmail) || null;

  // ── Sign Up ──
  function signup(name, email, password) {
    const existing = users.find((u) => u.email === email);
    if (existing) {
      return { success: false, message: "An account with this email already exists." };
    }
    const newUser = {
      name,
      email,
      password, // NOTE: plain text — this is a frontend-only demo
      karma: 0,
      problemsPosted: 0,
      solutionsSubmitted: 0,
      votesReceived: 0,
      implementedCount: 0,
      activity: [],
    };
    setUsers([...users, newUser]);
    setCurrentUserEmail(email);
    return { success: true };
  }

  // ── Log In ──
  function login(email, password) {
    const user = users.find((u) => u.email === email);
    if (!user || user.password !== password) {
      return { success: false, message: "Incorrect email or password." };
    }
    setCurrentUserEmail(email);
    return { success: true };
  }

  // ── Log Out ──
  function logout() {
    setCurrentUserEmail(null);
  }

  // ── Add Karma Points ──
  // Uses the updater-function form of setUsers so calling addKarma()
  // and incrementStat() back-to-back both apply correctly.
  function addKarma(amount, reason) {
    if (!currentUser) return;
    setUsers((prev) =>
      prev.map((u) => {
        if (u.email !== currentUser.email) return u;
        return {
          ...u,
          karma: u.karma + amount,
          activity: [
            { text: reason, points: amount, date: new Date().toISOString() },
            ...u.activity,
          ].slice(0, 20), // keep only last 20 entries
        };
      })
    );
  }

  // ── Increment a Stat Field ──
  function incrementStat(field, amount = 1) {
    if (!currentUser) return;
    setUsers((prev) =>
      prev.map((u) =>
        u.email === currentUser.email
          ? { ...u, [field]: u[field] + amount }
          : u
      )
    );
  }

  const value = {
    currentUser,
    isLoggedIn: Boolean(currentUser),
    signup,
    login,
    logout,
    addKarma,
    incrementStat,
    karmaRules: KARMA_RULES,
    getLevel,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
}
