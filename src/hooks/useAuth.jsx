// useAuth.jsx — Frontend-only authentication and karma reputation system.
//
// Syllabus Alignment:
// - Context API and State Management (Lectures 49-54)
// - Custom hooks and state architecture
// - Role-based authorization (Admin / Citizen)

import { createContext, useContext, useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext(null);

// Karma points awarded for community actions
const KARMA_RULES = {
  problemPosted: 10,
  solutionProposed: 15,
  upvoteReceived: 5,
  winningSolution: 30,
};

// Determines community rank based on karma
function getLevel(karma) {
  if (karma >= 1000) return "Change Maker";
  if (karma >= 500)  return "Community Builder";
  if (karma >= 200)  return "Problem Solver";
  if (karma >= 50)   return "Contributor";
  return "Newcomer";
}

// Next tier calculation for progress bars
export function getNextLevelProgress(karma) {
  if (karma >= 1000) return { current: 1000, next: 1000, percentage: 100, nextRank: "Max Rank" };
  if (karma >= 500)  return { current: karma, next: 1000, percentage: Math.round(((karma - 500) / 500) * 100), nextRank: "Change Maker" };
  if (karma >= 200)  return { current: karma, next: 500, percentage: Math.round(((karma - 200) / 300) * 100), nextRank: "Community Builder" };
  if (karma >= 50)   return { current: karma, next: 200, percentage: Math.round(((karma - 50) / 150) * 100), nextRank: "Problem Solver" };
  return { current: karma, next: 50, percentage: Math.round((karma / 50) * 100), nextRank: "Contributor" };
}

// Seed accounts for effortless testing and evaluation
const SEED_USERS = [
  {
    name: "Admin Moderator",
    email: "admin@crowdsolve.com",
    password: "admin123",
    role: "admin",
    karma: 1250,
    problemsPosted: 3,
    solutionsSubmitted: 7,
    votesReceived: 124,
    implementedCount: 4,
    joinedDate: "2026-01-10",
    activity: [
      { text: "Approved road repair initiative in Sector 17", points: 30, date: "2026-06-03" },
      { text: "Moderated community proposed waste solution", points: 20, date: "2026-05-30" },
      { text: "Proposed street lighting replacement blueprint", points: 15, date: "2026-05-20" },
    ],
  },
  {
    name: "Ravi Mehta",
    email: "ravi@crowdsolve.com",
    password: "password123",
    role: "citizen",
    karma: 280,
    problemsPosted: 2,
    solutionsSubmitted: 3,
    votesReceived: 45,
    implementedCount: 1,
    joinedDate: "2026-03-15",
    activity: [
      { text: "Posted problem 'Pothole near Sector 17'", points: 10, date: "2026-06-02" },
      { text: "Proposed solution 'Solar powered streetlights'", points: 15, date: "2026-05-25" },
      { text: "Received 50 upvotes on traffic signal proposal", points: 25, date: "2026-05-18" },
    ],
  },
];

export function AuthProvider({ children }) {
  const [users, setUsers] = useLocalStorage("crowdsolve_users", SEED_USERS);

  const [currentUserEmail, setCurrentUserEmail] = useLocalStorage(
    "crowdsolve_current_user",
    null
  );

  const currentUser = users.find((u) => u.email === currentUserEmail) || null;

  // Sign Up with enhanced user profile
  function signup(name, email, password) {
    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return { success: false, message: "An account with this email already exists." };
    }
    const newUser = {
      name,
      email: email.toLowerCase(),
      password,
      role: email.toLowerCase().includes("admin") ? "admin" : "citizen",
      karma: 20, // initial welcome bonus karma
      problemsPosted: 0,
      solutionsSubmitted: 0,
      votesReceived: 0,
      implementedCount: 0,
      joinedDate: new Date().toISOString().slice(0, 10),
      activity: [
        { text: "Joined CrowdSolve Community", points: 20, date: new Date().toISOString().slice(0, 10) },
      ],
    };
    setUsers([...users, newUser]);
    setCurrentUserEmail(newUser.email);
    return { success: true };
  }

  // Log In
  function login(email, password) {
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user || user.password !== password) {
      return { success: false, message: "Incorrect email or password." };
    }
    setCurrentUserEmail(user.email);
    return { success: true };
  }

  // Fast demo login helper for evaluation
  function demoLogin(type = "citizen") {
    if (type === "admin") {
      setCurrentUserEmail("admin@crowdsolve.com");
    } else {
      setCurrentUserEmail("ravi@crowdsolve.com");
    }
  }

  // Log Out
  function logout() {
    setCurrentUserEmail(null);
  }

  // Add Karma points
  const addKarma = useCallback((amount, reason) => {
    if (!currentUserEmail) return;
    setUsers((prev) =>
      prev.map((u) => {
        if (u.email !== currentUserEmail) return u;
        return {
          ...u,
          karma: u.karma + amount,
          activity: [
            { text: reason, points: amount, date: new Date().toISOString().slice(0, 10) },
            ...(u.activity || []),
          ].slice(0, 25),
        };
      })
    );
  }, [currentUserEmail, setUsers]);

  // Increment user stat
  const incrementStat = useCallback((field, amount = 1) => {
    if (!currentUserEmail) return;
    setUsers((prev) =>
      prev.map((u) =>
        u.email === currentUserEmail
          ? { ...u, [field]: (u[field] || 0) + amount }
          : u
      )
    );
  }, [currentUserEmail, setUsers]);

  // Admin action: toggle user role
  function toggleUserRole(targetEmail) {
    setUsers((prev) =>
      prev.map((u) =>
        u.email === targetEmail
          ? { ...u, role: u.role === "admin" ? "citizen" : "admin" }
          : u
      )
    );
  }

  // Admin action: adjust karma
  function adjustUserKarma(targetEmail, delta) {
    setUsers((prev) =>
      prev.map((u) =>
        u.email === targetEmail
          ? { ...u, karma: Math.max(0, u.karma + delta) }
          : u
      )
    );
  }

  const value = {
    currentUser,
    allUsers: users,
    isLoggedIn: Boolean(currentUser),
    isAdmin: currentUser?.role === "admin" || currentUser?.email === "admin@crowdsolve.com",
    signup,
    login,
    demoLogin,
    logout,
    addKarma,
    incrementStat,
    toggleUserRole,
    adjustUserKarma,
    karmaRules: KARMA_RULES,
    getLevel,
    getNextLevelProgress,
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
