// Home.jsx — Landing page for Eval 1 (Light Theme Prototype).
// Demonstrates: Hero, City Selector, How-It-Works, and live city problems.

import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import CitySelector from "../components/CitySelector";
import ProblemList from "../components/ProblemList";
import Stats from "../components/Stats";
import { useCity } from "../hooks/useCity";
import { useUserProblems } from "../hooks/useUserProblems";
import { problems as mockProblems } from "../data/problems";
import "./Home.css";

export default function Home() {
  const { selectedCity } = useCity();
  const { userProblems } = useUserProblems();

  // Merge user-posted problems with mock data.
  const problems = [...userProblems, ...mockProblems];

  // Filter problems for the selected city.
  const cityProblems = problems.filter((p) => p.city === selectedCity);

  // Show at most 4 problems on the homepage preview.
  const previewProblems = cityProblems.slice(0, 4);

  return (
    <div className="home-page">
      <Hero />

      {/* ──── CITY SELECTOR ──── */}
      <section id="city-selector" className="section city-section">
        <div className="container city-section__inner">
          <div>
            <p className="eyebrow">CHOOSE YOUR CITY</p>
            <h2 className="city-section__title">
              WHAT'S HAPPENING IN
              <br />
              YOUR CITY?
            </h2>
            <p className="city-section__desc">
              Select a city to discover civic issues and community discussions happening
              around you.
            </p>
          </div>
          <CitySelector variant="large" />
        </div>
      </section>

      {/* ──── THE PROBLEM (editorial) ──── */}
      <section className="section problem-statement">
        <div className="container problem-statement__inner">
          <h2 className="problem-statement__title">
            A REPORT IS A BEGINNING,
            <br />
            NOT A DEAD END.
          </h2>
          <p className="problem-statement__desc">
            Most complaint systems end the moment a report is filed.
            CrowdSolve keeps the civic conversation open — neighbours discuss the
            issue, coordinate ideas, and build stronger local communities.
          </p>
        </div>
      </section>

      {/* ──── IMPACT STATS ──── */}
      <Stats />

      {/* ──── HOW IT WORKS ──── */}
      <section id="how-it-works" className="section section--dark how-it-works">
        <div className="container">
          <div className="how-it-works__header">
            <img
              src="/images/community-discussion.jpg"
              alt="A group of community members discussing a local issue"
              className="how-it-works__image"
            />
            <div>
              <p className="eyebrow">HOW CROWDSOLVE WORKS</p>
              <h2 className="how-it-works__title">
                TURNING COMPLAINTS
                <br />
                INTO COLLABORATION.
              </h2>
              <p className="how-it-works__desc">
                Traditional complaint systems collect problems into bureaucratic silos.
                CrowdSolve opens the process so citizens can collaborate directly.
              </p>
            </div>
          </div>

          <div className="how-it-works__steps">
            {[
              { num: "01", title: "POST",    desc: "Report a civic problem in your neighbourhood with photos and details." },
              { num: "02", title: "DISCUSS",  desc: "Community members analyze and discuss the root cause." },
              { num: "03", title: "VOTE",     desc: "Upvote the most critical issues to gain community priority." },
              { num: "04", title: "ACTION",   desc: "Engage local groups and authorities for real change." },
            ].map((step) => (
              <div key={step.num} className="how-it-works__step">
                <p className="how-it-works__step-num">{step.num}</p>
                <p className="how-it-works__step-title">{step.title}</p>
                <p className="how-it-works__step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── LIVE CITY PROBLEMS ──── */}
      <section className="section live-problems">
        <div className="container">
          <div className="live-problems__header">
            <div>
              <p className="eyebrow">COMMUNITY BOARD</p>
              <h2 className="live-problems__title">{selectedCity.toUpperCase()}</h2>
              <p className="live-problems__subtitle">
                ACTIVE ISSUES REPORTED BY NEIGHBOURS.
              </p>
            </div>
            <Link to="/problems" className="btn btn-outline-dark">
              VIEW ALL PROBLEMS →
            </Link>
          </div>

          <ProblemList
            problems={previewProblems}
            emptyMessage={`No problems reported in ${selectedCity} yet. Be the first to post one.`}
          />
        </div>
      </section>

      {/* ──── FINAL CTA (Light Theme) ──── */}
      <section className="section final-cta">
        <div className="container final-cta__box">
          <div className="final-cta__content">
            <span className="eyebrow">MAKE AN IMPACT</span>
            <h2 className="final-cta__title">
              DON'T JUST REPORT IT.
              <br />
              CROWDSOLVE IT.
            </h2>
            <p className="final-cta__desc">
              Join thousands of residents transforming their neighbourhoods one issue at a time.
            </p>
            <div className="final-cta__actions">
              <Link to="/problems" className="btn btn-primary">
                EXPLORE PROBLEMS →
              </Link>
              <Link to="/post" className="btn btn-outline-dark">
                POST A PROBLEM +
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
