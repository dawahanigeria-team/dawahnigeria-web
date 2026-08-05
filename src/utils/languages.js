// Language ids as returned by /all_lang_api.php.
//
// The catalogue is multilingual, so language is the strongest relevance signal
// we have: a Yoruba listener scrolling past Hausa lectures is the single
// biggest source of noise on the home feed. These ids are passed to the
// listing endpoints (`langid`) so filtering happens server-side, across the
// whole catalogue rather than the page that happens to be loaded.

// Sentinel for "don't filter" — the listing endpoints return every language
// when `langid` is omitted entirely.
export const ALL_LANGUAGES_ID = null;

// English. Kept as the default because that is what the home feed has always
// requested; changing it would silently reshuffle the page for every visitor.
export const DEFAULT_LANGUAGE_ID = 6;

// Ordered for the chip row: the languages most of the catalogue is recorded in
// come first so the common choices are reachable without scrolling.
export const HOME_LANGUAGES = [
  { id: ALL_LANGUAGES_ID, name: "All" },
  { id: 6, name: "English" },
  { id: 7, name: "Yoruba" },
  { id: 8, name: "Hausa" },
  { id: 157, name: "Arabic" },
  { id: 9, name: "Igbo" },
  { id: 46504, name: "Pidgin English" },
  { id: 50041, name: "Igala" },
  { id: 877, name: "Ebira" },
  { id: 53181, name: "Nupe" },
];

const STORAGE_KEY = "dn_home_language";

// Remembering the choice matters more here than it would on a music site:
// someone who listens in Yoruba listens in Yoruba every visit, and making them
// re-pick each time is the whole problem we are trying to solve.
export const readStoredLanguage = () => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null) return undefined;
    if (raw === "all") return ALL_LANGUAGES_ID;
    const parsed = Number(raw);
    return HOME_LANGUAGES.some((l) => l.id === parsed) ? parsed : undefined;
  } catch {
    // Private mode / storage disabled — fall back to the default.
    return undefined;
  }
};

export const storeLanguage = (id) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, id === ALL_LANGUAGES_ID ? "all" : String(id));
  } catch {
    // Non-fatal: the selection still applies for this session.
  }
};
