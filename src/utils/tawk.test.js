import { shouldLoadTawkWidget } from "./tawk";

describe("shouldLoadTawkWidget", () => {
  const createStorage = ({ throws = false } = {}) => ({
    setItem: () => {
      if (throws) {
        throw new Error("blocked");
      }
    },
    removeItem: () => {
      if (throws) {
        throw new Error("blocked");
      }
    },
  });

  test("returns false when tawk is explicitly disabled", () => {
    expect(
      shouldLoadTawkWidget({
        env: { REACT_APP_ENABLE_TAWK: "false" },
      })
    ).toBe(false);
  });

  test("returns false when browser privacy controls are enabled", () => {
    expect(
      shouldLoadTawkWidget({
        env: {},
        navigatorRef: {
          cookieEnabled: true,
          globalPrivacyControl: true,
          doNotTrack: "0",
        },
        windowRef: {
          localStorage: createStorage(),
          sessionStorage: createStorage(),
        },
      })
    ).toBe(false);
  });

  test("returns false when do not track is enabled", () => {
    expect(
      shouldLoadTawkWidget({
        env: {},
        navigatorRef: {
          cookieEnabled: true,
          globalPrivacyControl: false,
          doNotTrack: "1",
        },
        windowRef: {
          localStorage: createStorage(),
          sessionStorage: createStorage(),
        },
      })
    ).toBe(false);
  });

  test("returns false when browser storage is unavailable", () => {
    expect(
      shouldLoadTawkWidget({
        env: {},
        navigatorRef: {
          cookieEnabled: true,
          globalPrivacyControl: false,
          doNotTrack: "0",
        },
        windowRef: {
          localStorage: createStorage({ throws: true }),
          sessionStorage: createStorage(),
        },
      })
    ).toBe(false);
  });

  test("returns true when privacy and storage checks pass", () => {
    expect(
      shouldLoadTawkWidget({
        env: {},
        navigatorRef: {
          cookieEnabled: true,
          globalPrivacyControl: false,
          doNotTrack: "0",
        },
        windowRef: {
          localStorage: createStorage(),
          sessionStorage: createStorage(),
        },
      })
    ).toBe(true);
  });
});
