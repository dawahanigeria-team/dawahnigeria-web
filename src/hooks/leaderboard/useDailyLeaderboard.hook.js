import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { leaderboardApi } from "../../services";
import { formatDayString } from "../../utils/leaderboard/usageTracking";

const DEFAULT_LIMIT = 20;
const DEFAULT_OFFSET = 0;

const resolveTimeZone = () => {
  if (typeof Intl === "undefined" || !Intl.DateTimeFormat) {
    return "UTC";
  }

  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
};

const normalizeUserId = (userId) => {
  const parsed = Number(userId);
  if (!Number.isFinite(parsed)) {
    return null;
  }

  return Math.trunc(parsed);
};

export const useDailyLeaderboard = ({
  day,
  limit = DEFAULT_LIMIT,
  offset = DEFAULT_OFFSET,
  userId,
  timeZone,
  enabled = true,
} = {}) => {
  const normalizedUserId = useMemo(() => normalizeUserId(userId), [userId]);
  const resolvedTimeZone = useMemo(() => timeZone || resolveTimeZone(), [timeZone]);
  const resolvedDay = useMemo(
    () => day || formatDayString(new Date(), resolvedTimeZone),
    [day, resolvedTimeZone]
  );

  const query = useQuery({
    queryKey: [
      "daily-leaderboard",
      resolvedDay,
      limit,
      offset,
      normalizedUserId,
    ],
    queryFn: () =>
      leaderboardApi.getDailyLeaderboard({
        day: resolvedDay,
        limit,
        offset,
        userId: normalizedUserId,
      }),
    enabled,
    staleTime: 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    keepPreviousData: true,
    refetchOnWindowFocus: true,
  });

  return {
    ...query,
    day: resolvedDay,
  };
};
