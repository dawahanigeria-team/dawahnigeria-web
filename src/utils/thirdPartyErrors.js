const TAWK_PATH_PATTERNS = [
  "tawk.to",
  "embed.tawk.to",
  "twk-",
  "twk-chunk",
  "/_s/v4/app/",
];

const TAWK_MESSAGE_PATTERNS = [
  "unable to store cookie",
  "blocked by cors policy",
  "failed to load resource",
];

const includesPattern = (value = "", patterns = []) => {
  const normalizedValue = value.toLowerCase();
  return patterns.some((pattern) => normalizedValue.includes(pattern));
};

export const isTawkError = ({ message = "", filename = "", stack = "" } = {}) =>
  includesPattern(filename, TAWK_PATH_PATTERNS) ||
  includesPattern(stack, TAWK_PATH_PATTERNS) ||
  (includesPattern(message, TAWK_MESSAGE_PATTERNS) &&
    (includesPattern(filename, TAWK_PATH_PATTERNS) ||
      includesPattern(stack, TAWK_PATH_PATTERNS) ||
      message.toLowerCase().includes("tawk")));
