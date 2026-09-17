import type { Locale, LocalizedString } from "./types";

export function t(value: LocalizedString, locale: Locale): string {
  return value[locale];
}

export const ui = {
  works: { zh: "作品", en: "Works" } satisfies LocalizedString,
  lastSeen: {
    zh: "上次出现在",
    en: "Last seen at",
  } satisfies LocalizedString,
  with: { zh: "和", en: "with" } satisfies LocalizedString,
  back: { zh: "返回", en: "Back" } satisfies LocalizedString,
  light: { zh: "淺色", en: "Light" } satisfies LocalizedString,
  dark: { zh: "深色", en: "Dark" } satisfies LocalizedString,
  langSwitch: { zh: "English", en: "中文" } satisfies LocalizedString,
  solo: { zh: "独自", en: "solo" } satisfies LocalizedString,
} as const;
