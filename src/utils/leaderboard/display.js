export const formatLeaderboardDuration = (seconds = 0) => {
  const totalSeconds = Number(seconds);
  if (!Number.isFinite(totalSeconds) || totalSeconds <= 0) {
    return "0m";
  }

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (hours <= 0) {
    return `${minutes}m`;
  }

  return `${hours}h ${String(minutes).padStart(2, "0")}m`;
};

export const getLeaderboardTopEntries = (entries, limit = 3) => {
  if (!Array.isArray(entries) || entries.length === 0) {
    return [];
  }

  const normalizedLimit = Number.isFinite(Number(limit))
    ? Math.max(1, Math.trunc(Number(limit)))
    : 3;

  return entries.slice(0, normalizedLimit);
};
