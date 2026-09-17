"use client";

import { ui } from "@/content/i18n";
import { usePrefs } from "@/lib/prefs";

export function LangToggle() {
  const { locale, toggleLocale, ready } = usePrefs();
  const label = ui.langSwitch[locale];

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={label}
      className="pill fixed bottom-6 right-6 z-50"
      suppressHydrationWarning
    >
      {ready ? label : ui.langSwitch.zh}
    </button>
  );
}
