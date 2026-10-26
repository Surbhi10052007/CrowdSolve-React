import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CityProvider } from "./hooks/useCity";
import { AuthProvider } from "./hooks/useAuth";
import { ToastProvider } from "./hooks/useToast";
import { ProblemProvider } from "./hooks/useProblemsContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Problems from "./pages/Problems";
import ProblemDetails from "./pages/ProblemDetails";
import PostProblem from "./pages/PostProblem";
import Dashboard from "./pages/Dashboard";
import ImpactDashboard from "./pages/ImpactDashboard";
import SolvedProblems from "./pages/SolvedProblems";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <ToastProvider>
      <ProblemProvider>
        <AuthProvider>
          <CityProvider>
            <BrowserRouter>

              <a href="#main-content" className="skip-link">
                Skip to main content
              </a>

              <Navbar />

              <main id="main-content">
                <Routes>

                  <Route path="/" element={<Home />} />
                  <Route path="/problems" element={<Problems />} />
                  <Route path="/problems/:id" element={<ProblemDetails />} />
                  <Route path="/impact" element={<ImpactDashboard />} />
                  <Route path="/solved" element={<SolvedProblems />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />

                  <Route
                    path="/post"
                    element={
                      <ProtectedRoute>
                        <PostProblem />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>

              <Footer />
            </BrowserRouter>
          </CityProvider>
        </AuthProvider>
      </ProblemProvider>
    </ToastProvider>
  );
}
