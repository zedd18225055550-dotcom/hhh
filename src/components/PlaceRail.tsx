"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import { places } from "@/content/places";
import { t, ui } from "@/content/i18n";
import { usePrefs } from "@/lib/prefs";
import { formatDisplayDate } from "@/lib/relativeTime";

export function PlaceRail() {
  const { locale } = usePrefs();
  const railRef = useRef<HTMLDivElement>(null);

  const scrollByCard = useCallback((dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-place-card]");
    const amount = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollByCard(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollByCard(-1);
      } else if (e.key === "Home") {
        e.preventDefault();
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else if (e.key === "End") {
        e.preventDefault();
        el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
      }
    };

    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [scrollByCard]);

  return (
    <div className="relative flex h-dvh flex-col">
      <div
        ref={railRef}
        tabIndex={0}
        role="region"
        aria-label={locale === "zh" ? "地点时间线" : "Places timeline"}
        className="place-rail flex h-full flex-1 snap-x snap-mandatory items-center gap-6 overflow-x-auto overflow-y-hidden px-[max(1.5rem,calc(50vw-11rem))] outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--accent)]"
      >
        {places.map((place) => {
          const companions = place.companions
            .map((c) => t(c, locale))
            .join(locale === "zh" ? "、" : ", ");

          return (
            <article
              key={place.id}
              data-place-card
              className="place-card flex w-[min(88vw,22rem)] shrink-0 snap-center flex-col"
            >
              <time
                dateTime={place.date}
                className="mb-3 text-center text-xs font-medium tabular-nums tracking-wide text-[var(--muted)]"
              >
                {formatDisplayDate(place.date, locale)}
              </time>
              <div className="hero-clay mb-4 aspect-[4/3] min-h-[12rem] w-full overflow-hidden rounded-[1.75rem] bg-[var(--surface)]">
                {/* SVG clay assets: plain img avoids next/image SVG quirks */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={place.image}
                  alt={t(place.title, locale)}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h2 className="mb-1.5 text-center text-lg font-semibold tracking-tight text-[var(--fg)]">
                {t(place.title, locale)}
              </h2>
              <p className="text-center text-sm text-[var(--muted)]">{companions}</p>
            </article>
          );
        })}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
        <Link href="/" className="pill pointer-events-auto">
          {ui.back[locale]}
        </Link>
      </div>
    </div>
  );
}
