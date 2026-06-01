import {
  calculateSessionDurationSeconds,
  formatDayString,
  buildTrackUsagePayload,
} from "./usageTracking";

describe("usageTracking utils", () => {
  describe("calculateSessionDurationSeconds", () => {
    test("returns null when timestamps are invalid", () => {
      expect(calculateSessionDurationSeconds(null, Date.now())).toBeNull();
      expect(calculateSessionDurationSeconds(Date.now(), null)).toBeNull();
      expect(calculateSessionDurationSeconds(1000, 999)).toBeNull();
    });

    test("enforces minimum of 1 second", () => {
      expect(calculateSessionDurationSeconds(1000, 1500)).toBe(1);
    });

    test("rounds down elapsed seconds", () => {
      expect(calculateSessionDurationSeconds(1000, 5999)).toBe(4);
    });

    test("caps duration to API max (86400)", () => {
      const oneDayAndBit = 1000 + (90000 * 1000);
      expect(calculateSessionDurationSeconds(1000, oneDayAndBit)).toBe(86400);
    });
  });

  describe("formatDayString", () => {
    test("formats date in UTC when timezone is UTC", () => {
      const occurredAt = new Date("2026-02-18T23:40:00Z");
      expect(formatDayString(occurredAt, "UTC")).toBe("2026-02-18");
    });

    test("supports timezone-aware local campaign day", () => {
      const occurredAt = new Date("2026-02-18T23:40:00Z");
      expect(formatDayString(occurredAt, "Africa/Lagos")).toBe("2026-02-19");
    });
  });

  describe("buildTrackUsagePayload", () => {
    test("builds the API payload shape", () => {
      const occurredAt = "2026-02-18T18:40:00.000Z";
      expect(
        buildTrackUsagePayload({
          durationSeconds: 540,
          eventId: "8d62bca6-8d4b-4ae9-8e20-5c182be6d9f2",
          userId: 123,
          occurredAt,
          day: "2026-02-18",
        })
      ).toEqual({
        action: "track_usage",
        duration_seconds: 540,
        event_id: "8d62bca6-8d4b-4ae9-8e20-5c182be6d9f2",
        occurred_at: occurredAt,
        day: "2026-02-18",
        userId: 123,
      });
    });

    test("omits optional fields when not provided", () => {
      expect(
        buildTrackUsagePayload({
          durationSeconds: 120,
        })
      ).toEqual({
        action: "track_usage",
        duration_seconds: 120,
      });
    });
  });
});
