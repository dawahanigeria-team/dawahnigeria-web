import {
  formatTrackDuration,
  orderAlbumTracks,
  shuffleAlbumTracks,
} from "./albumPlayback";

describe("web album playback", () => {
  it("orders dated lectures oldest first", () => {
    const result = orderAlbumTracks([
      { nid: 3, lectitle: "Daily Talk (15-07-26)" },
      { nid: 1, lectitle: "Daily Talk (09-07-26)" },
      { nid: 2, lectitle: "Daily Talk (14-07-26)" },
    ]);
    expect(result.map(({ nid }) => nid)).toEqual([1, 2, 3]);
  });

  it("prefers numbered lesson order and removes duplicates", () => {
    const result = orderAlbumTracks([
      { nid: 2, lectitle: "Book Dars 12" },
      { nid: 1, lectitle: "Book Dars 2" },
      { nid: 1, lectitle: "Book Dars 2" },
    ]);
    expect(result.map(({ nid }) => nid)).toEqual([1, 2]);
  });

  it("does not present missing duration metadata as zero", () => {
    expect(formatTrackDuration("00:00:00")).toBe("Duration updating");
    expect(formatTrackDuration("00:11:26")).toBe("11:26");
  });

  it("shuffles a complete copy without mutating the teaching order", () => {
    const input = [{ nid: 1 }, { nid: 2 }, { nid: 3 }];
    const result = shuffleAlbumTracks(input, () => 0);
    expect(result).toEqual([{ nid: 2 }, { nid: 3 }, { nid: 1 }]);
    expect(input.map(({ nid }) => nid)).toEqual([1, 2, 3]);
  });
});
