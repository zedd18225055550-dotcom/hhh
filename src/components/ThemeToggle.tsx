"use client";

import { ui } from "@/content/i18n";
import { usePrefs } from "@/lib/prefs";

export function ThemeToggle() {
  const { theme, toggleTheme, locale, ready } = usePrefs();
  const label = theme === "dark" ? ui.light[locale] : ui.dark[locale];

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      className="pill fixed bottom-6 left-6 z-50"
      suppressHydrationWarning
    >
      {ready ? label : ui.light.zh}
    </button>
  );
}
