// PostProblem.jsx — Form to submit a new community problem without photo upload for Eval 1.
// Demonstrates: controlled form inputs, form validation, useState,
// useNavigate, event handling (preventDefault).

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cities } from "../data/cities";
import { useCity } from "../hooks/useCity";
import { useUserProblems } from "../hooks/useUserProblems";
import { useAuth } from "../hooks/useAuth";
import "./PostProblem.css";

const CATEGORIES = ["Civic", "Environment", "Campus", "Education", "Technology", "Community"];

const initialForm = {
  title: "",
  description: "",
  city: "",
  location: "",
  category: "Civic",
  tags: "",
};

export default function PostProblem() {
  const { selectedCity } = useCity();
  const { addProblem } = useUserProblems();
  const { currentUser, addKarma, incrementStat, karmaRules } = useAuth();
  const navigate = useNavigate();

  // Pre-select the currently selected city.
  const [form, setForm] = useState({ ...initialForm, city: selectedCity });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Generic change handler for all form fields.
  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // Basic validation — checks required fields.
  function validate() {
    const newErrors = {};
    if (form.title.trim() === "") newErrors.title = "Please enter a problem title.";
    if (form.description.trim() === "") newErrors.description = "Please describe the problem.";
    if (form.city.trim() === "") newErrors.city = "Please choose a city.";
    if (form.location.trim() === "") newErrors.location = "Please add a location.";
    return newErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const newProblem = {
      id: Date.now(),
      city: form.city,
      title: form.title.trim(),
      category: form.category,
      location: form.location.trim(),
      description: form.description.trim(),
      status: "Proposed",
      votes: 0,
      solutions: 0,
      image: "/images/hero-city.jpg",
      author: currentUser ? currentUser.name : "You",
      date: new Date().toISOString().slice(0, 10),
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    addProblem(newProblem);
    addKarma(karmaRules.problemPosted, `Posted "${newProblem.title}"`);
    incrementStat("problemsPosted");

    setSubmitted(true);

    // Redirect to the new problem page after a brief success message.
    setTimeout(() => {
      navigate(`/problems/${newProblem.id}`);
    }, 900);
  }

  if (submitted) {
    return (
      <div className="post-problem post-problem--success">
        <div className="container">
          <h1>PROBLEM POSTED ✓</h1>
          <p>Taking you to your new problem page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="post-problem">
      <section className="post-problem__header">
        <div className="container">
          <p className="eyebrow">SHARE A REAL PROBLEM</p>
          <h1>POST A PROBLEM</h1>
          <p className="post-problem__subtitle">
            Give your community the details they need to understand and act on it.
          </p>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container post-problem__container">
          <form className="post-problem__form" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="title">Problem title</label>
              <input
                id="title"
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                className={errors.title ? "has-error" : ""}
                placeholder="e.g. Pothole near Sector 17"
              />
              {errors.title && <p className="field-error">{errors.title}</p>}
            </div>

            <div className="field">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                className={errors.description ? "has-error" : ""}
                placeholder="Describe what's happening and who it affects..."
              />
              {errors.description && <p className="field-error">{errors.description}</p>}
            </div>

            <div className="post-problem__row">
              <div className="field">
                <label htmlFor="city">City</label>
                <select
                  id="city"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className={errors.city ? "has-error" : ""}
                >
                  <option value="">Select a city</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                {errors.city && <p className="field-error">{errors.city}</p>}
              </div>

              <div className="field">
                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={form.location}
                  onChange={handleChange}
                  className={errors.location ? "has-error" : ""}
                  placeholder="e.g. Sector 17 Market"
                />
                {errors.location && <p className="field-error">{errors.location}</p>}
              </div>
            </div>

            <div className="post-problem__row">
              <div className="field">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="tags">Tags (comma separated)</label>
                <input
                  id="tags"
                  name="tags"
                  type="text"
                  value={form.tags}
                  onChange={handleChange}
                  placeholder="e.g. road safety, monsoon"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              POST PROBLEM
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
