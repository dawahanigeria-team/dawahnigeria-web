const getHistoryState = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.history?.state ?? null;
};

export const hasUsableBackHistory = (historyState = getHistoryState()) => {
  const idx = historyState?.idx;
  return Number.isInteger(idx) && idx > 0;
};

export const getBackNavigationConfig = (
  fallbackPath = "/dawahcast",
  historyState = getHistoryState()
) => {
  if (hasUsableBackHistory(historyState)) {
    return { to: -1, options: undefined };
  }

  return {
    to: fallbackPath,
    options: { replace: true },
  };
};
