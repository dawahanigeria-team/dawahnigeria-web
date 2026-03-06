import { getBackNavigationConfig, hasUsableBackHistory } from "./navigation";

describe("navigation utils", () => {
  describe("hasUsableBackHistory", () => {
    test("returns true when react router has prior history entries", () => {
      expect(hasUsableBackHistory({ idx: 2 })).toBe(true);
    });

    test("returns false for direct-entry pages", () => {
      expect(hasUsableBackHistory({ idx: 0 })).toBe(false);
      expect(hasUsableBackHistory({})).toBe(false);
      expect(hasUsableBackHistory(null)).toBe(false);
    });
  });

  describe("getBackNavigationConfig", () => {
    test("navigates back when the current history stack is safe", () => {
      expect(getBackNavigationConfig("/dawahcast/lecturers", { idx: 1 })).toEqual(
        { to: -1, options: undefined }
      );
    });

    test("falls back to the provided route on direct-entry pages", () => {
      expect(getBackNavigationConfig("/dawahcast/lecturers", { idx: 0 })).toEqual(
        {
          to: "/dawahcast/lecturers",
          options: { replace: true },
        }
      );
    });
  });
});
