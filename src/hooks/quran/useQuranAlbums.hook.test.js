import { mergeQuranAlbumPage } from "./useQuranAlbums.helpers";

describe("mergeQuranAlbumPage", () => {
  test("hydrates cumulative data from cached page 1 data", () => {
    const cachedPageData = [{ id: 1, name: "Al-Fatiha" }];
    const result = mergeQuranAlbumPage({
      accumulated: [],
      incomingPageData: cachedPageData,
      page: 1,
      loadedPages: new Set(),
      pageSize: 20,
    });

    expect(result.accumulated).toEqual(cachedPageData);
    expect(result.loadedPages.has(1)).toBe(true);
  });

  test("does not duplicate already-loaded pages", () => {
    const firstPage = [{ id: 1 }];
    const loadedPages = new Set([1]);
    const result = mergeQuranAlbumPage({
      accumulated: firstPage,
      incomingPageData: firstPage,
      page: 1,
      loadedPages,
      pageSize: 20,
    });

    expect(result.accumulated).toEqual(firstPage);
  });

  test("marks last page when response size is below page size", () => {
    const result = mergeQuranAlbumPage({
      accumulated: [{ id: 1 }],
      incomingPageData: [{ id: 2 }],
      page: 2,
      loadedPages: new Set([1]),
      pageSize: 20,
    });

    expect(result.hasReachedLastPage).toBe(true);
  });
});
