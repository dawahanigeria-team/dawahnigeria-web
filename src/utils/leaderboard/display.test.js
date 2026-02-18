import {
  formatLeaderboardDuration,
  getLeaderboardTopEntries,
} from "./display";

describe("leaderboard display utils", () => {
  describe("formatLeaderboardDuration", () => {
    test("returns minutes for sub-hour durations", () => {
      expect(formatLeaderboardDuration(59)).toBe("0m");
      expect(formatLeaderboardDuration(3599)).toBe("59m");
    });

    test("returns hour/minute format for hour+ durations", () => {
      expect(formatLeaderboardDuration(3600)).toBe("1h 00m");
      expect(formatLeaderboardDuration(7260)).toBe("2h 01m");
    });

    test("handles invalid values safely", () => {
      expect(formatLeaderboardDuration()).toBe("0m");
      expect(formatLeaderboardDuration(null)).toBe("0m");
      expect(formatLeaderboardDuration("abc")).toBe("0m");
      expect(formatLeaderboardDuration(-4)).toBe("0m");
    });
  });

  describe("getLeaderboardTopEntries", () => {
    test("returns top entries with default limit of 3", () => {
      const entries = [
        { rank: 1, userId: 1 },
        { rank: 2, userId: 2 },
        { rank: 3, userId: 3 },
        { rank: 4, userId: 4 },
      ];

      expect(getLeaderboardTopEntries(entries)).toEqual([
        { rank: 1, userId: 1 },
        { rank: 2, userId: 2 },
        { rank: 3, userId: 3 },
      ]);
    });

    test("returns an empty list for invalid input", () => {
      expect(getLeaderboardTopEntries()).toEqual([]);
      expect(getLeaderboardTopEntries(null)).toEqual([]);
      expect(getLeaderboardTopEntries({})).toEqual([]);
    });

    test("supports a custom limit", () => {
      const entries = [{ rank: 1 }, { rank: 2 }, { rank: 3 }];
      expect(getLeaderboardTopEntries(entries, 2)).toEqual([
        { rank: 1 },
        { rank: 2 },
      ]);
    });
  });
});
