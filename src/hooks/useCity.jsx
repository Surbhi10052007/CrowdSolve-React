// useCity.jsx — Context + hook for the currently selected city.
//
// CityProvider wraps the app so that Navbar, Home, Problems, and
// PostProblem can all read and update the same selected city.
// The choice is saved to localStorage so it survives a page refresh.

import { createContext, useContext } from "react";
import { useLocalStorage } from "./useLocalStorage";

const CityContext = createContext(null);

export function CityProvider({ children }) {
  const [selectedCity, setSelectedCity] = useLocalStorage(
    "crowdsolve_selected_city",
    "Chandigarh" // default city on first visit
  );

  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity }}>
      {children}
    </CityContext.Provider>
  );
}

export function useCity() {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error("useCity must be used inside a CityProvider");
  }
  return context;
}
