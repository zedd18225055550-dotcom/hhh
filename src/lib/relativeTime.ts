import type { Locale } from "@/content/types";

export function formatRelativeTime(
  dateIso: string,
  locale: Locale,
  now: Date = new Date()
): string {
  const date = new Date(dateIso + "T12:00:00");
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  const rtf = new Intl.RelativeTimeFormat(locale === "zh" ? "zh-CN" : "en", {
    numeric: "auto",
  });

  if (Math.abs(diffDays) < 1) {
    return rtf.format(0, "day");
  }
  if (Math.abs(diffDays) < 30) {
    return rtf.format(-diffDays, "day");
  }
  const diffMonths = Math.round(diffDays / 30);
  if (Math.abs(diffMonths) < 12) {
    return rtf.format(-diffMonths, "month");
  }
  const diffYears = Math.round(diffDays / 365);
  return rtf.format(-diffYears, "year");
}

export function formatDisplayDate(dateIso: string, locale: Locale): string {
  const date = new Date(dateIso + "T12:00:00");
  return new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}
