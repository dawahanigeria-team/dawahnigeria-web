import { useCallback, useEffect, useMemo, useRef } from "react";
import { leaderboardApi } from "../../services";
import {
  calculateSessionDurationSeconds,
  formatDayString,
} from "../../utils/leaderboard/usageTracking";

const PENDING_EVENTS_STORAGE_KEY = "dn:leaderboard:pending-usage-events";
const MAX_PENDING_EVENTS = 20;

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

const createEventId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const readPendingEvents = () => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(PENDING_EVENTS_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writePendingEvents = (events) => {
  if (typeof window === "undefined") {
    return;
  }

  const trimmedEvents = events.slice(-MAX_PENDING_EVENTS);

  try {
    window.localStorage.setItem(
      PENDING_EVENTS_STORAGE_KEY,
      JSON.stringify(trimmedEvents)
    );
  } catch {
    // Ignore localStorage write errors (quota/private browsing)
  }
};

const queuePendingEvent = (event) => {
  const existing = readPendingEvents();
  writePendingEvents([...existing, event]);
};

export const useUsageSessionTracking = (userId) => {
  const normalizedUserId = useMemo(() => normalizeUserId(userId), [userId]);
  const timeZone = useMemo(resolveTimeZone, []);

  const sessionStartAtRef = useRef(null);
  const sessionEventIdRef = useRef(createEventId());
  const isReplayingRef = useRef(false);

  const replayPendingEvents = useCallback(async () => {
    if (
      normalizedUserId === null ||
      isReplayingRef.current
    ) {
      return;
    }

    const queued = readPendingEvents();
    if (!queued.length) {
      return;
    }

    const eventsForCurrentUser = [];
    const retainedEvents = [];

    queued.forEach((event) => {
      if (Number(event?.userId) === normalizedUserId) {
        eventsForCurrentUser.push(event);
      } else {
        retainedEvents.push(event);
      }
    });

    if (!eventsForCurrentUser.length) {
      return;
    }

    isReplayingRef.current = true;

    try {
      const failedEvents = [];

      for (const event of eventsForCurrentUser) {
        try {
          await leaderboardApi.trackUsage({
            durationSeconds: event.durationSeconds,
            eventId: event.eventId,
            occurredAt: event.occurredAt,
            day: event.day,
            userId: event.userId,
          });
        } catch {
          failedEvents.push(event);
        }
      }

      writePendingEvents([...retainedEvents, ...failedEvents]);
    } finally {
      isReplayingRef.current = false;
    }
  }, [normalizedUserId]);

  const flushCurrentSession = useCallback(
    async ({ useKeepalive = false } = {}) => {
      if (normalizedUserId === null) {
        sessionStartAtRef.current = null;
        return;
      }

      const sessionStartAt = sessionStartAtRef.current;
      if (!Number.isFinite(sessionStartAt)) {
        return;
      }

      const sessionEndAt = Date.now();
      const durationSeconds = calculateSessionDurationSeconds(
        sessionStartAt,
        sessionEndAt
      );

      sessionStartAtRef.current = null;

      if (!durationSeconds) {
        return;
      }

      const occurredAtDate = new Date(sessionEndAt);
      const usageEvent = {
        durationSeconds,
        eventId: sessionEventIdRef.current,
        occurredAt: occurredAtDate.toISOString(),
        day: formatDayString(occurredAtDate, timeZone),
        userId: normalizedUserId,
      };

      sessionEventIdRef.current = createEventId();

      try {
        await leaderboardApi.trackUsage({
          ...usageEvent,
          useKeepalive,
        });
      } catch {
        queuePendingEvent(usageEvent);
      }
    },
    [normalizedUserId, timeZone]
  );

  const startSessionIfNeeded = useCallback(() => {
    if (normalizedUserId === null) {
      return;
    }

    if (typeof document !== "undefined" && document.visibilityState === "hidden") {
      return;
    }

    if (sessionStartAtRef.current !== null) {
      return;
    }

    sessionStartAtRef.current = Date.now();
    sessionEventIdRef.current = createEventId();
  }, [normalizedUserId]);

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    if (normalizedUserId === null) {
      sessionStartAtRef.current = null;
      return;
    }

    startSessionIfNeeded();
    void replayPendingEvents();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        void flushCurrentSession({ useKeepalive: true });
        return;
      }

      startSessionIfNeeded();
      void replayPendingEvents();
    };

    const handlePageHide = () => {
      void flushCurrentSession({ useKeepalive: true });
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
      void flushCurrentSession();
    };
  }, [
    normalizedUserId,
    startSessionIfNeeded,
    flushCurrentSession,
    replayPendingEvents,
  ]);
};
