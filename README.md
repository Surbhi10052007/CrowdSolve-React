# CrowdSolve — Community-Driven Civic Problem Solving Platform

> **React Evaluation 1 Project**  
> A modern, responsive civic engagement web application built with **React (Vite)**, **React Router**, custom hooks, and context-driven state management.

---

## 📌 Project Overview

**CrowdSolve** empowers citizens to actively participate in local governance and neighborhood improvement. Citizens can report civic issues (road damage, water supply disruptions, streetlighting failures, garbage dumps, drainage overflow), brainstorm and propose solutions, upvote priority initiatives, track official resolution progress through a multi-stage status tracker, and participate in community discussions and leaderboards.

---

## ✨ Key Features & Functionality

### 🏙️ Multi-City Filtering & Context
- **Global City Selector:** Switch effortlessly between major cities (e.g., Delhi, Mumbai, Bengaluru, Chandigarh, Pune) or view all cities combined.
- **Context API Integration:** The selected city is synchronized globally via `CityProvider` and automatically filters problems, statistics, and leaderboards across pages.

### 📊 Dynamic Live Impact Stats & Analytics
- **Live Metric Counter:** Real-time calculation of active problems, proposed solutions, resolved issues, and total community karma points.
- **Category Breakdown:** Interactive visual distribution of civic issues categorized by Infrastructure, Sanitation, Utilities, Traffic & Road Safety, and Environment.

### 🔍 Problems Discovery & Advanced Filtering
- **Interactive Search & Filter Bar:** Search problems by title and description keywords.
- **Multi-criteria Filtering:** Filter by Category, City, and Status (`Reported`, `Under Review`, `In Progress`, `Resolved`).
- **Sorting Options:** Sort problems by most recent date or highest community upvotes.

### 📝 Problem Details & Visual Status Tracker
- **Multi-Stage Status Pipeline:** Visual 4-stage progression bar (`Reported` ➔ `Under Review` ➔ `In Progress` ➔ `Resolved`) with status badge indicators and contextual resolution explanations.
- **Endorsement & Social Sharing:** Citizens can endorse issues to boost urgency and copy direct problem links for neighborhood sharing.

### 💡 Solution Proposals & Community Voting
- **Solution Cards:** Displays community-submitted solution ideas with author details, timestamps, cost/feasibility indicators, and net vote scores.
- **Interactive Vote Widget:** Reusable upvote/downvote widget with local storage persistence and karma calculation.

### 💬 Nested Community Discussion Forum
- **Hierarchical Discussions:** Multi-level nested replies for constructive civic debate and solution refinement.
- **Avatar & Timestamp Formatting:** Clean user avatars, relative timestamps, and responsive layout.

### 🏆 Community Leaderboard & Karma Rewards
- **Contributor Rankings:** Top civic contributors ranked by karma points earned through problem reporting, solution proposing, and community validation.
- **Civic Badges:** Badges recognizing active citizens, top solvers, and verified neighborhood champions.

### 🔐 Authentication & User Dashboard
- **Authentication Flow:** Simulated login and signup with form validation, demo quick-login credentials, and session persistence in `localStorage`.
- **Protected Routes:** `ProtectedRoute` component guards issue submission and user dashboard pages.
- **Citizen Dashboard:** Personalized view displaying problems reported by the logged-in user, their solution contributions, and total karma score.
- **Post a Problem:** Comprehensive submission form with title, category, city, location/landmark, image URL, and description validation.

---

## 👥 Member-Wise Contribution Breakdown (Eval 1)

| Member | Role | Assigned Components, Pages & Modules |
| :--- | :--- | :--- |
| **Member 1 (Surbhi)**<br>*(Project Lead)* | **Core Architecture & Data Layer** | <ul><li>Vite project scaffolding & configuration (`vite.config.js`, `package.json`, `index.html`)</li><li>React Router v6 setup & root configuration (`main.jsx`, `App.jsx`)</li><li>Global design tokens, typography, and CSS variables (`index.css`)</li><li>Layout scaffolding (`Navbar.jsx`, `Navbar.css`, `Footer.jsx`, `Footer.css`)</li><li>Context Providers & Custom Hooks (`useAuth.jsx`, `useCity.jsx`, `useLocalStorage.js`, `useUserProblems.js`, `useVote.js`)</li><li>Mock Data Layer (`cities.js`, `problems.js`, `solutions.js`)</li><li>Protected Route wrapper (`ProtectedRoute.jsx`)</li></ul> |
| **Member 2 (Shubhleen Kaur)** | **Landing Experience & UI Components** | <ul><li>Landing Page layout & orchestration (`Home.jsx`, `Home.css`)</li><li>Hero banner with call-to-actions (`Hero.jsx`, `Hero.css`)</li><li>City Selector component (`CitySelector.jsx`, `CitySelector.css`)</li><li>Problem preview cards and listing layout (`ProblemCard.jsx`, `ProblemCard.css`, `ProblemList.jsx`, `ProblemList.css`)</li><li>Solution proposals display card (`SolutionCard.jsx`, `SolutionCard.css`)</li><li>Multi-stage resolution tracker (`StatusTracker.jsx`, `StatusTracker.css`)</li><li>Interactive voting component (`VoteButton.jsx`, `VoteButton.css`)</li><li>Dynamic live statistics & category analytics (`Stats.jsx`, `Stats.css`)</li><li>Problem Details view (`ProblemDetails.jsx`, `ProblemDetails.css`)</li><li>Nested comment & discussion system (`CommentSection.jsx`, `CommentSection.css`)</li></ul> |
| **Member 3 (Karan Kumar)** | **Pages, Auth & Community Features** | <ul><li>Problems discovery catalog with search and filters (`Problems.jsx`, `Problems.css`)</li><li>Authentication pages (`Login.jsx`, `Signup.jsx`, `AuthPages.css`)</li><li>Citizen Dashboard page (`Dashboard.jsx`, `Dashboard.css`)</li><li>New Problem submission form (`PostProblem.jsx`, `PostProblem.css`)</li><li>404 Not Found error page (`NotFound.jsx`, `NotFound.css`)</li><li>Community Leaderboard & Karma Rankings (`CommunityLeaderboard.jsx`, `CommunityLeaderboard.css`)</li></ul> |

---

## 🗂️ Project Structure

```
CrowdSolve-React/
├── public/
│   ├── favicon.svg
│   └── images/                     # Civic issue mock assets & illustrations
├── src/
│   ├── components/                 # Reusable UI & Layout Components
│   │   ├── CitySelector.css / .jsx
│   │   ├── CommentSection.css / .jsx
│   │   ├── CommunityLeaderboard.css / .jsx
│   │   ├── Footer.css / .jsx
│   │   ├── Hero.css / .jsx
│   │   ├── Navbar.css / .jsx
│   │   ├── ProblemCard.css / .jsx
│   │   ├── ProblemList.css / .jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── SolutionCard.css / .jsx
│   │   ├── Stats.css / .jsx
│   │   ├── StatusTracker.css / .jsx
│   │   └── VoteButton.css / .jsx
│   ├── data/                       # Mock Data Layer
│   │   ├── cities.js               # City options & metadata
│   │   ├── problems.js             # Initial dataset of civic issues
│   │   └── solutions.js            # Initial dataset of proposed solutions
│   ├── hooks/                      # Custom React Hooks & Contexts
│   │   ├── useAuth.jsx             # AuthContext, login/signup/logout, karma
│   │   ├── useCity.jsx             # CityContext for active city filtering
│   │   ├── useLocalStorage.js      # Persistent state synchronization
│   │   ├── useUserProblems.js      # User-submitted problems persistence
│   │   └── useVote.js              # Upvote/downvote handler hook
│   ├── pages/                      # Application Page Views
│   │   ├── AuthPages.css
│   │   ├── Dashboard.css / .jsx
│   │   ├── Home.css / .jsx
│   │   ├── Login.jsx
│   │   ├── NotFound.css / .jsx
│   │   ├── PostProblem.css / .jsx
│   │   ├── ProblemDetails.css / .jsx
│   │   ├── Problems.css / .jsx
│   │   └── Signup.jsx
│   ├── App.jsx                     # Route definitions & layout wrappers
│   ├── index.css                   # Global CSS tokens, reset, utility classes
│   └── main.jsx                    # Vite React root mount point
├── index.html                      # HTML5 entry template
├── package.json                    # Project dependencies and scripts
└── vite.config.js                  # Vite configuration
```

---

## 🗺️ Application Routes

| Route | Component | Access | Description |
| :--- | :--- | :--- | :--- |
| `/` | `Home` | Public | Hero introduction, city selector, impact stats, live preview, how it works |
| `/problems` | `Problems` | Public | Searchable and filterable catalog of all civic issues |
| `/problems/:id` | `ProblemDetails` | Public | Detailed issue page, status tracker, solutions list, vote widget, discussion |
| `/post-problem` | `PostProblem` | **Protected** | Multi-field citizen problem submission form (requires login) |
| `/dashboard` | `Dashboard` | **Protected** | Personal user portal showing reported problems, votes, and karma |
| `/login` | `Login` | Public | User authentication with pre-filled demo account options |
| `/signup` | `Signup` | Public | New citizen account registration |
| `*` | `NotFound` | Public | 404 fallback page with redirection back to home |

---

## 🛠️ Technology Stack

- **UI Framework:** React 18+ (Functional Components & Hooks)
- **Build Tool / Bundler:** Vite
- **Routing:** React Router DOM v6
- **Styling:** Modular Vanilla CSS with CSS Custom Properties (Variables), Flexbox, CSS Grid, animations
- **State Management:** React Context API (`CityContext`, `AuthContext`) + LocalStorage Hook
- **Icons & Visuals:** SVG icons and curated civic images

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js** (v16+ or v18+ recommended) and **npm** installed.

### 2. Installation
Clone the repository and install project dependencies:

```bash
git clone https://github.com/Surbhi10052007/CrowdSolve-React.git
cd CrowdSolve-React
npm install
```

### 3. Running Locally
Start the local development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

### 4. Building for Production
To verify and generate an optimized production bundle:

```bash
npm run build
npm run preview
```
