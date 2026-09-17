"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Locale } from "@/content/types";

type Theme = "dark" | "light";

interface PrefsContextValue {
  theme: Theme;
  locale: Locale;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  ready: boolean;
}

const PrefsContext = createContext<PrefsContextValue | null>(null);

const THEME_KEY = "hhh-theme";
const LOCALE_KEY = "hhh-locale";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme === "light");
  root.dataset.theme = theme;
}

export function PrefsProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [locale, setLocaleState] = useState<Locale>("zh");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
    const storedLocale = localStorage.getItem(LOCALE_KEY) as Locale | null;
    const nextTheme: Theme =
      storedTheme === "light" || storedTheme === "dark" ? storedTheme : "dark";
    const nextLocale: Locale =
      storedLocale === "en" || storedLocale === "zh" ? storedLocale : "zh";
    setThemeState(nextTheme);
    setLocaleState(nextLocale);
    applyTheme(nextTheme);
    setReady(true);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(LOCALE_KEY, next);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "zh" ? "en" : "zh");
  }, [locale, setLocale]);

  const value = useMemo(
    () => ({
      theme,
      locale,
      setTheme,
      toggleTheme,
      setLocale,
      toggleLocale,
      ready,
    }),
    [theme, locale, setTheme, toggleTheme, setLocale, toggleLocale, ready]
  );

  return (
    <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>
  );
}

export function usePrefs() {
  const ctx = useContext(PrefsContext);
  if (!ctx) {
    throw new Error("usePrefs must be used within PrefsProvider");
  }
  return ctx;
}
