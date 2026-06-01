const STORAGE_TEST_KEY = "__dn_tawk_probe__";

const canUseStorage = (storage) => {
  if (!storage) {
    return false;
  }

  try {
    storage.setItem(STORAGE_TEST_KEY, "1");
    storage.removeItem(STORAGE_TEST_KEY);
    return true;
  } catch (error) {
    return false;
  }
};

const isDoNotTrackEnabled = (navigatorRef, windowRef) => {
  const values = [
    navigatorRef?.doNotTrack,
    navigatorRef?.msDoNotTrack,
    windowRef?.doNotTrack,
  ]
    .filter((value) => value !== undefined && value !== null)
    .map((value) => String(value).toLowerCase());

  return values.includes("1") || values.includes("yes");
};

export const shouldLoadTawkWidget = ({
  env = process.env,
  navigatorRef = typeof navigator !== "undefined" ? navigator : null,
  windowRef = typeof window !== "undefined" ? window : null,
} = {}) => {
  if (env.REACT_APP_ENABLE_TAWK === "false") {
    return false;
  }

  if (!navigatorRef || !windowRef) {
    return false;
  }

  if (navigatorRef.globalPrivacyControl) {
    return false;
  }

  if (isDoNotTrackEnabled(navigatorRef, windowRef)) {
    return false;
  }

  if (navigatorRef.cookieEnabled === false) {
    return false;
  }

  return (
    canUseStorage(windowRef.localStorage) &&
    canUseStorage(windowRef.sessionStorage)
  );
};

export const scheduleWhenIdle = (
  callback,
  timeout = 1500,
  windowRef = typeof window !== "undefined" ? window : null
) => {
  if (!windowRef) {
    return () => {};
  }

  if (typeof windowRef.requestIdleCallback === "function") {
    const id = windowRef.requestIdleCallback(callback, { timeout });
    return () => windowRef.cancelIdleCallback?.(id);
  }

  const id = windowRef.setTimeout(callback, timeout);
  return () => windowRef.clearTimeout(id);
};
