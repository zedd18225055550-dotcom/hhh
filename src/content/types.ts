export type Locale = "zh" | "en";

export interface LocalizedString {
  zh: string;
  en: string;
}

export interface Profile {
  name: LocalizedString;
  bio: LocalizedString;
  /** Path under /public, e.g. /places/hero.svg */
  heroImage: string;
  heroHref: string;
}

export interface Work {
  id: string;
  title: LocalizedString;
  href: string;
  year?: string;
}

export interface SocialLink {
  id: string;
  label: LocalizedString;
  href: string;
}

export interface Place {
  id: string;
  /** ISO date YYYY-MM-DD */
  date: string;
  title: LocalizedString;
  companions: LocalizedString[];
  /** Daytime clay image under /public */
  image: string;
  /** Optional night variant for future use */
  nightImage?: string;
}

/** Webhook payload for future auto check-in (v2) */
export interface CheckInPayload {
  secret?: string;
  date: string;
  title: LocalizedString | string;
  companions?: (LocalizedString | string)[];
  image?: string;
  nightImage?: string;
  id?: string;
}
