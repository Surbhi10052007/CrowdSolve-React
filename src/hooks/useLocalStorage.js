/**
 * ====================================================================
 * CROWDSOLVE - EVAL 1
 * --------------------------------------------------------------------
 * File: useLocalStorage.js
 * Contributor: Member 1 (Surbhi - Project Lead)
 * Description: Custom reusable hook for synchronizing React state with browser localStorage.
 * ====================================================================
 */

//
// Usage:  const [value, setValue] = useLocalStorage("myKey", defaultVal);

import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  // Lazy initialiser — only reads localStorage once, on mount.
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch (error) {
      console.error("Could not read localStorage key:", key, error);
      return initialValue;
    }
  });

  // Whenever the value changes, sync it to localStorage.
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Could not save localStorage key:", key, error);
    }
  }, [key, value]);

  return [value, setValue];
}
