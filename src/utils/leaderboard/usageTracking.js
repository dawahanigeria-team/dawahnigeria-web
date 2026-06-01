const DAY_FORMATTER_CACHE = new Map();

const getDayFormatter = (timeZone = "UTC") => {
  if (DAY_FORMATTER_CACHE.has(timeZone)) {
    return DAY_FORMATTER_CACHE.get(timeZone);
  }

  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  DAY_FORMATTER_CACHE.set(timeZone, formatter);
  return formatter;
};

export const calculateSessionDurationSeconds = (
  sessionStartAtMs,
  sessionEndAtMs,
  maxDurationSeconds = 86400
) => {
  if (!Number.isFinite(sessionStartAtMs) || !Number.isFinite(sessionEndAtMs)) {
    return null;
  }

  const elapsedMs = sessionEndAtMs - sessionStartAtMs;
  if (elapsedMs <= 0) {
    return null;
  }

  const rawSeconds = Math.floor(elapsedMs / 1000);
  const boundedSeconds = Math.min(Math.max(rawSeconds, 1), maxDurationSeconds);

  return boundedSeconds;
};

export const formatDayString = (date = new Date(), timeZone = "UTC") => {
  const instance = date instanceof Date ? date : new Date(date);

  if (Number.isNaN(instance.getTime())) {
    throw new Error("Invalid date provided to formatDayString");
  }

  return getDayFormatter(timeZone).format(instance);
};

export const buildTrackUsagePayload = ({
  durationSeconds,
  eventId,
  occurredAt,
  day,
  userId,
}) => {
  const payload = {
    action: "track_usage",
    duration_seconds: durationSeconds,
  };

  if (eventId) {
    payload.event_id = eventId;
  }

  if (occurredAt) {
    payload.occurred_at = occurredAt;
  }

  if (day) {
    payload.day = day;
  }

  if (userId !== undefined && userId !== null) {
    payload.userId = userId;
  }

  return payload;
};
