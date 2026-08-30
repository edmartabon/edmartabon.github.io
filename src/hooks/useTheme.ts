import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "theme";

/**
 * Theme lives on the document element, not in React state.
 *
 * The inline boot script in index.html sets the class before first paint, and
 * the toggle flips it directly. Keeping it out of render means the server-
 * rendered markup and the first client render are always identical, so
 * hydration never has to patch a mismatch, and there is no flash of the
 * wrong palette.
 *
 * `isDark` exists only so the control can announce its own state. It starts
 * false on the server and on the first client render, which keeps those two
 * identical, and syncs from the document immediately after mount. A toggle
 * button that never tells a screen reader which mode is active is a button
 * whose state is invisible to the people who most need it stated.
 */
export function useTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = useCallback(() => {
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";
    root.classList.toggle("dark", next === "dark");
    root.style.colorScheme = next;
    setIsDark(next === "dark");
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable in private modes. The toggle still works for
      // this page view, which is the part that matters.
    }
  }, []);

  return { isDark, toggle };
}
