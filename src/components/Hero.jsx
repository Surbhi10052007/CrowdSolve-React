// Hero.jsx — Light themed Hero section for Eval 1.

import { Link } from "react-router-dom";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg-pattern" />
      <img
        src="/images/hero-city.jpg"
        alt="A city road in the daylight"
        className="hero__image"
      />
      <div className="hero__overlay" />

      <div className="hero__content container">
        <span className="hero__badge">Community Civic Action</span>
        <h1 className="hero__title">CROWDSOLVE</h1>
        <h2 className="hero__tagline">
          REAL PROBLEMS.
          <br />
          REAL PEOPLE.
          <br />
          REAL CHANGE.
        </h2>
        <p className="hero__desc">
          Where everyday civic issues meet community-powered local solutions.
        </p>

        <div className="hero__actions">
          <Link to="/problems" className="btn btn-primary">
            EXPLORE PROBLEMS →
          </Link>
          <Link to="/post" className="btn btn-outline-dark">
            POST A PROBLEM +
          </Link>
        </div>
      </div>

      <a href="#city-selector" className="hero__scroll">
        SCROLL TO DISCOVER ↓
      </a>
    </section>
  );
}
