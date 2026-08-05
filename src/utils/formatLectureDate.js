// Format the legacy `updated_date` string the lecture APIs return for display
// in list rows (helps users scan a long catalog by recency).
//
// The backend sends a non-standard string, e.g.:  "Wed, 2023/03/08 - 14:15"
// (weekday, then YYYY/MM/DD, " - ", HH:MM). It is NOT a value `new Date(...)`
// parses reliably across browsers, so we can't just hand it to the Date ctor.
//
// We only use this for DISPLAY. Ordering is already handled server-side via the
// `sort` param, so this function must never be used for sorting.

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/**
 * Convert the API's `updated_date` string into a short display label.
 *
 * @param {string} updatedDate - e.g. "Wed, 2023/03/08 - 14:15"
 * @returns {string} e.g. "8 Mar 2023", or "" if the input has no parseable date.
 *
 * We pull the YYYY/MM/DD out with a regex rather than slicing or trusting
 * `new Date(...)`, so odd weekdays/whitespace or a future format tweak degrade
 * to "" (the row just omits the date) instead of rendering "Invalid Date".
 */
export const formatLectureDate = (updatedDate) => {
  if (!updatedDate || typeof updatedDate !== "string") return "";

  const match = updatedDate.match(/(\d{4})\/(\d{1,2})\/(\d{1,2})/);
  if (!match) return "";

  const [, year, month, day] = match;
  const monthIndex = Number(month) - 1;
  if (monthIndex < 0 || monthIndex > 11) return "";

  return `${Number(day)} ${MONTHS[monthIndex]} ${year}`;
};

const MINUTE_MS = 60 * 1000;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;
const WEEK_MS = 7 * DAY_MS;
const MONTH_MS = 30 * DAY_MS;

/**
 * Parse the API's `updated_date` into a millisecond epoch.
 *
 * @param {string} updatedDate - e.g. "Wed, 2023/03/08 - 14:15"
 * @returns {number} epoch ms, or 0 when there is no parseable date.
 *
 * Built on the same regex as formatLectureDate rather than `new Date(...)`,
 * which does not parse this shape consistently across browsers. Time is
 * optional so rows that only carry a date still sort and label correctly.
 */
export const parseLectureDate = (updatedDate) => {
  if (!updatedDate || typeof updatedDate !== "string") return 0;

  const match = updatedDate.match(/(\d{4})\/(\d{1,2})\/(\d{1,2})(?:\s*-\s*(\d{1,2}):(\d{2}))?/);
  if (!match) return 0;

  const [, year, month, day, hour, minute] = match;
  const monthIndex = Number(month) - 1;
  if (monthIndex < 0 || monthIndex > 11) return 0;

  const parsed = new Date(
    Number(year),
    monthIndex,
    Number(day),
    Number(hour || 0),
    Number(minute || 0)
  ).getTime();

  return Number.isFinite(parsed) ? parsed : 0;
};

/**
 * Relative label ("3d ago", "5w ago") with an absolute fallback past six
 * months, because "47w ago" reads worse than "Mar 2023". Matches the mobile
 * app so a lecture reads the same on both surfaces.
 *
 * @returns {string} e.g. "3d ago", or "" when the date is unknown/future —
 * the caller omits the element rather than rendering a misleading placeholder.
 */
export const formatRelativeLectureDate = (updatedDate, now = Date.now()) => {
  const timestamp = parseLectureDate(updatedDate);
  if (!timestamp) return "";

  const diff = now - timestamp;
  // Future-dated rows are a data error, not something to label "in 3 days".
  if (diff < 0) return "";
  if (diff < MINUTE_MS) return "just now";
  if (diff < HOUR_MS) return `${Math.floor(diff / MINUTE_MS)}m ago`;
  if (diff < DAY_MS) return `${Math.floor(diff / HOUR_MS)}h ago`;
  if (diff < 2 * DAY_MS) return "yesterday";
  if (diff < WEEK_MS) return `${Math.floor(diff / DAY_MS)}d ago`;
  if (diff < 6 * MONTH_MS) return `${Math.floor(diff / WEEK_MS)}w ago`;

  return formatLectureDate(updatedDate);
};
