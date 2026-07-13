import { ClubEvent, clubEvents } from "@/content/calendarData";
import { defaultLanguage, localeByLanguage, LanguageCode } from "@/lib/i18n";

const ANDORRA_TZ = "Europe/Andorra";

export const nowInAndorra = () => new Date();

export const getEventEnd = (event: ClubEvent) => {
  if (event.end) return new Date(event.end);
  if (event.start) return new Date(event.start);
  return null;
};

export const getEventStart = (event: ClubEvent) => {
  if (!event.start) return null;
  return new Date(event.start);
};

export const getEventStatus = (event: ClubEvent, reference = nowInAndorra()) => {
  const start = getEventStart(event);
  const end = getEventEnd(event);

  if (!start) {
    return "historic" as const;
  }

  if (reference < start) return "upcoming" as const;
  if (end && reference > end) return "done" as const;
  return "live" as const;
};

export const getEventsByYear = (year: number) =>
  clubEvents.filter((event) => event.year === year).sort((a, b) => (a.start ?? "9999").localeCompare(b.start ?? "9999"));

export const getNextEvent = (reference = nowInAndorra()) =>
  clubEvents.find((event) => {
    const start = getEventStart(event);
    return start ? start > reference : false;
  }) ?? null;

export const getLastCompletedEvent = (reference = nowInAndorra()) => {
  const pastEvents = clubEvents.filter((event) => {
    const end = getEventEnd(event);
    return end ? end <= reference : false;
  });

  return pastEvents.at(-1) ?? null;
};

export const formatEventDateRange = (event: ClubEvent, language: LanguageCode = defaultLanguage) => {
  if (!event.start) return event.displayDate;

  const start = new Date(event.start);
  const end = event.end ? new Date(event.end) : null;
  const sameDay = end
    ? start.getFullYear() === end.getFullYear() &&
      start.getMonth() === end.getMonth() &&
      start.getDate() === end.getDate()
    : true;

  const dateFormatter = new Intl.DateTimeFormat(localeByLanguage[language], {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: ANDORRA_TZ,
  });

  const timeFormatter = new Intl.DateTimeFormat(localeByLanguage[language], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: ANDORRA_TZ,
  });

  if (!end) {
    return `${dateFormatter.format(start)} · ${timeFormatter.format(start)}`;
  }

  if (sameDay) {
    return `${dateFormatter.format(start)} · ${timeFormatter.format(start)} - ${timeFormatter.format(end)}`;
  }

  return `${dateFormatter.format(start)} ${timeFormatter.format(start)} → ${dateFormatter.format(end)} ${timeFormatter.format(end)}`;
};

export const formatMonthGroup = (event: ClubEvent, language: LanguageCode = defaultLanguage) => {
  if (!event.start) return "Sense data exacta";
  return new Intl.DateTimeFormat(localeByLanguage[language], { month: "long", year: "numeric", timeZone: ANDORRA_TZ }).format(new Date(event.start));
};

export const groupEventsByMonth = (events: ClubEvent[], language: LanguageCode = defaultLanguage) => {
  const groups = new Map<string, ClubEvent[]>();
  for (const event of events) {
    const key = formatMonthGroup(event, language);
    groups.set(key, [...(groups.get(key) ?? []), event]);
  }
  return Array.from(groups.entries());
};

export const getCountdownParts = (target: Date, reference = nowInAndorra()) => {
  const deltaMs = Math.max(target.getTime() - reference.getTime(), 0);
  const totalSeconds = Math.floor(deltaMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, totalSeconds };
};

export const isForecastWindowOpen = (event: ClubEvent, reference = nowInAndorra()) => {
  const start = getEventStart(event);
  if (!start) return false;
  const diffDays = (start.getTime() - reference.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays <= 16;
};
