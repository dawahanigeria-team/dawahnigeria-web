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
