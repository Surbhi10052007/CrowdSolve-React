/**
 * ====================================================================
 * CROWDSOLVE - EVAL 1
 * --------------------------------------------------------------------
 * File: cities.js
 * Contributor: Member 1 (Surbhi - Project Lead)
 * Description: Seed data dictionary for supported Indian cities with metadata and helper functions.
 * ====================================================================
 */

//
// Every problem in problems.js has a "city" field that must match
// one of these names.  The cityStats object provides mock numbers
// for the "City Impact" section on the homepage.

export const cities = [
  "Chandigarh",
  "Delhi",
  "Mumbai",
  "Bengaluru",
  "Pune",
  "Hyderabad",
  "Jaipur",
];

// Mock impact numbers per city (shown on the homepage).
// A real app would get these from a backend API.
export const cityStats = {
  Chandigarh: { problems: 248, solutions: 891, votes: 3420, implemented: 27 },
  Delhi:      { problems: 512, solutions: 1640, votes: 7830, implemented: 63 },
  Mumbai:     { problems: 634, solutions: 2010, votes: 9120, implemented: 71 },
  Bengaluru:  { problems: 401, solutions: 1325, votes: 6210, implemented: 48 },
  Pune:       { problems: 275, solutions: 940, votes: 3990, implemented: 33 },
  Hyderabad:  { problems: 318, solutions: 1080, votes: 4670, implemented: 39 },
  Jaipur:     { problems: 190, solutions: 640, votes: 2510, implemented: 21 },
};
