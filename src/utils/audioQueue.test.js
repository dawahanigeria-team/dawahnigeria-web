import { getNextTrackIndex } from "./audioQueue";

describe("getNextTrackIndex", () => {
  test("moves to the next track based on current track id", () => {
    const pack = [{ nid: 10 }, { nid: 11 }, { nid: 12 }];

    expect(getNextTrackIndex(pack, 10)).toBe(1);
  });

  test("wraps to first track when current track is the last one", () => {
    const pack = [{ nid: 10 }, { nid: 11 }, { nid: 12 }];

    expect(getNextTrackIndex(pack, 12)).toBe(0);
  });

  test("returns -1 when track list or current id is invalid", () => {
    expect(getNextTrackIndex([], 12)).toBe(-1);
    expect(getNextTrackIndex([{ nid: 10 }], 12)).toBe(-1);
  });
});
