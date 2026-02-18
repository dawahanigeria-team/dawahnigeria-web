import { getStore } from "../store/storeRegistry";
import { buildTrackUsagePayload } from "../utils/leaderboard/usageTracking";
import { refreshAccessToken } from "./tokenRefresh";

const PROJECT_ID = "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25";
const LEADERBOARD_ENDPOINT = "/leaderboardApi.php";
const MAX_DURATION_SECONDS = 86400;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

const toFiniteNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const normalizeUserId = (userId) => {
  const parsed = toFiniteNumber(userId);
  if (parsed === null) return null;
  return Math.trunc(parsed);
};

const normalizeDurationSeconds = (durationSeconds) => {
  const parsed = toFiniteNumber(durationSeconds);
  if (parsed === null) {
    throw new Error("durationSeconds must be a number");
  }

  return Math.min(MAX_DURATION_SECONDS, Math.max(1, Math.trunc(parsed)));
};

const getBaseUrl = () => process.env.REACT_APP_API_BASE_URL || "";
const getEndpointUrl = () => `${getBaseUrl()}${LEADERBOARD_ENDPOINT}`;

const getStoredAccessToken = () => {
  const token = getStore()?.getState?.()?.user?.token;
  if (!token || typeof token !== "string" || token.trim() === "") {
    return "";
  }

  return token.trim();
};

const hasStoredRefreshToken = () => {
  const refreshToken = getStore()?.getState?.()?.user?.refreshToken;
  return Boolean(
    refreshToken &&
    typeof refreshToken === "string" &&
    refreshToken.trim() !== ""
  );
};

const resolveAccessToken = async () => {
  const storedToken = getStoredAccessToken();
  if (storedToken) {
    return storedToken;
  }

  if (!hasStoredRefreshToken()) {
    throw new Error("Access token is required");
  }

  try {
    const refreshedToken = await refreshAccessToken();
    if (typeof refreshedToken === "string" && refreshedToken.trim() !== "") {
      return refreshedToken.trim();
    }
  } catch {
    // Ignore refresh error, throw standardized auth error below.
  }

  throw new Error("Access token is required");
};

const parseResponseJson = async (response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

const sendAuthenticatedRequest = (token, payload, keepalive) =>
  fetch(getEndpointUrl(), {
    method: "POST",
    keepalive,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-project": PROJECT_ID,
      Authorization: `Bearer ${token}`,
      "X-Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

const postAuthenticated = async (payload, { keepalive = false } = {}) => {
  const token = await resolveAccessToken();

  let response = await sendAuthenticatedRequest(token, payload, keepalive);
  let data = await parseResponseJson(response);

  // Recover from stale access tokens by refreshing once and retrying.
  if ((response.status === 401 || response.status === 403) && hasStoredRefreshToken()) {
    try {
      const nextToken = await refreshAccessToken();
      if (typeof nextToken === "string" && nextToken.trim()) {
        response = await sendAuthenticatedRequest(nextToken.trim(), payload, keepalive);
        data = await parseResponseJson(response);
      }
    } catch {
      // Keep original auth error response below.
    }
  }

  if (!response.ok) {
    throw new Error(data?.message || "Failed to send usage event");
  }

  return data;
};

export const leaderboardApi = {
  trackUsage: async ({
    durationSeconds,
    eventId,
    occurredAt,
    day,
    userId,
    useKeepalive = false,
  }) => {
    const payload = buildTrackUsagePayload({
      durationSeconds: normalizeDurationSeconds(durationSeconds),
      eventId,
      occurredAt,
      day,
      userId: normalizeUserId(userId),
    });

    return postAuthenticated(payload, { keepalive: useKeepalive });
  },

  getDailyLeaderboard: async ({ day, limit = DEFAULT_LIMIT, offset = 0, userId }) => {
    const payload = {
      action: "get_daily_leaderboard",
      limit: Math.min(MAX_LIMIT, Math.max(1, Math.trunc(limit || DEFAULT_LIMIT))),
      offset: Math.max(0, Math.trunc(offset || 0)),
    };

    if (day) {
      payload.day = day;
    }

    const normalizedUserId = normalizeUserId(userId);
    if (normalizedUserId !== null) {
      payload.userId = normalizedUserId;
    }

    return postAuthenticated(payload);
  },
};
