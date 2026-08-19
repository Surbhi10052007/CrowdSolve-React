// useLocalStorage.js — Custom hook that works like useState but
// persists the value to localStorage so it survives page refresh.
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
