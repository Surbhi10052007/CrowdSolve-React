# CrowdSolve - Eval 1

This is the **Eval 1** implementation of CrowdSolve, built for a React project evaluation.

## Features Completed
- React project setup with Vite
- React Router (nested routes, dynamic routes, protected routes)
- Layout components (Navbar, Footer)
- Home page, Problems listing, Problem Details, Post Problem, Dashboard, Login, Signup
- State management with `useState`, `useEffect`, and `useLocalStorage`
- Context API for global state (`CityProvider`, `AuthProvider`)
- Mock data layer for problems, solutions, and cities

## Member-Wise Breakdown (Eval 1)

### Member 1 (Project Lead)
- **Role:** Project setup, global CSS, layout, router configuration, data models, custom hooks
- **Files:** `package.json`, `vite.config.js`, `index.html`, `main.jsx`, `App.jsx`, `index.css`, `Navbar.*`, `Footer.*`, `ProtectedRoute.jsx`, all `hooks/`, all `data/`

### Member 2
- **Role:** Home page layout and interactive UI components, Problem Details page
- **Files:** `Home.*`, `Hero.*`, `CitySelector.*`, `ProblemCard.*`, `ProblemList.*`, `SolutionCard.*`, `StatusTracker.*`, `VoteButton.*`, `Stats.*`, `ProblemDetails.*`, `CommentSection.*`

### Member 3
- **Role:** Problems listing page with filtering, Auth pages, 404 Not Found
- **Files:** `Problems.*`, `Login.jsx`, `Signup.jsx`, `AuthPages.css`, `NotFound.*`

## How to Run
1. Run `npm install`
2. Run `npm run dev`
