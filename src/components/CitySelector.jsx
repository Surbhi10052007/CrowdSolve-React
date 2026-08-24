import { useState, useRef, useEffect } from "react";
import { cities } from "../data/cities";
import { useCity } from "../hooks/useCity";
import "./CitySelector.css";

export default function CitySelector({ variant = "compact" }) {
  const { selectedCity, setSelectedCity } = useCity();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(city) {
    setSelectedCity(city);
    setIsOpen(false);
  }

  return (
    <div
      className={`city-selector city-selector--${variant}`}
      ref={wrapperRef}
    >
      <button
        type="button"
        className="city-selector__trigger"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="city-selector__pin">📍</span>
        <span className="city-selector__name">{selectedCity.toUpperCase()}</span>
        <span className={`city-selector__arrow ${isOpen ? "is-open" : ""}`}>▾</span>
      </button>

      {isOpen && (
        <div className="city-selector__panel" role="listbox">
          <div className="city-selector__list">
            {cities.map((city) => (
              <button
                key={city}
                type="button"
                role="option"
                aria-selected={city === selectedCity}
                className={`city-selector__option ${
                  city === selectedCity ? "is-selected" : ""
                }`}
                onClick={() => handleSelect(city)}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
