"use client";

import Link from "next/link";
import { profile } from "@/content/profile";
import { works } from "@/content/works";
import { socials } from "@/content/socials";
import { getNewestPlace } from "@/content/places";
import { t, ui } from "@/content/i18n";
import { usePrefs } from "@/lib/prefs";
import { formatRelativeTime } from "@/lib/relativeTime";

export function HomeContent() {
  const { locale } = usePrefs();
  const newest = getNewestPlace();
  const people =
    newest?.companions.map((c) => t(c, locale)).join(locale === "zh" ? "、" : ", ") ??
    "";

  return (
    <main className="mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center px-6 py-20 text-center">
      <Link
        href={profile.heroHref}
        className="hero-clay group mb-10 block w-full max-w-sm transition-transform duration-500 ease-out hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        aria-label={locale === "zh" ? "查看地点时间线" : "View places timeline"}
      >
        <div className="aspect-[4/3] min-h-[12rem] w-full overflow-hidden rounded-[2rem] bg-[var(--surface)] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)]">
          {/* SVG clay assets: plain img avoids next/image SVG quirks */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profile.heroImage}
            alt={t(profile.name, locale)}
            width={800}
            height={600}
            className="h-full w-full object-cover"
            decoding="async"
          />
        </div>
      </Link>

      <h1 className="mb-3 text-3xl font-semibold tracking-tight text-[var(--fg)] sm:text-4xl">
        {t(profile.name, locale)}
      </h1>

      <p className="mb-8 max-w-md text-balance text-[15px] leading-relaxed text-[var(--muted)] sm:text-base">
        {t(profile.bio, locale)}
      </p>

      {newest && (
        <p className="mb-10 max-w-md text-pretty text-sm leading-relaxed text-[var(--muted)]">
          <span className="text-[var(--fg-soft)]">{ui.lastSeen[locale]}</span>{" "}
          <Link
            href="/places"
            className="font-medium text-[var(--fg)] underline decoration-[var(--border)] underline-offset-4 transition-colors hover:decoration-[var(--accent)]"
          >
            {t(newest.title, locale)}
          </Link>{" "}
          <span className="text-[var(--fg-soft)]">{ui.with[locale]}</span>{" "}
          <span className="text-[var(--fg)]">{people}</span>
          <span className="text-[var(--muted)]">
            {" "}
            · {formatRelativeTime(newest.date, locale)}
          </span>
        </p>
      )}

      <section className="mb-12 w-full max-w-sm text-left">
        <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
          {ui.works[locale]}
        </h2>
        <ul className="space-y-2">
          {works.map((work) => (
            <li key={work.id}>
              <a
                href={work.href}
                className="group flex items-baseline justify-between gap-4 rounded-xl px-3 py-2.5 transition-colors hover:bg-[var(--surface)]"
              >
                <span className="text-[15px] font-medium text-[var(--fg)] group-hover:text-[var(--accent)]">
                  {t(work.title, locale)}
                </span>
                {work.year && (
                  <span className="shrink-0 text-xs tabular-nums text-[var(--muted)]">
                    {work.year}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <nav
        className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-[var(--muted)]"
        aria-label="Social"
      >
        {socials.map((s, i) => (
          <span key={s.id} className="inline-flex items-center gap-3">
            {i > 0 && <span aria-hidden className="text-[var(--border)]">·</span>}
            <a
              href={s.href}
              target={s.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={s.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="transition-colors hover:text-[var(--fg)]"
            >
              {t(s.label, locale)}
            </a>
          </span>
        ))}
      </nav>
    </main>
  );
}
