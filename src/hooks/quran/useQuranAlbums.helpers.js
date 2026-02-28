export const mergeQuranAlbumPage = ({
  accumulated = [],
  incomingPageData = [],
  page = 1,
  loadedPages = new Set(),
  pageSize = 20,
}) => {
  const safeAccumulated = Array.isArray(accumulated) ? accumulated : [];
  const safeIncomingPageData = Array.isArray(incomingPageData)
    ? incomingPageData
    : [];
  const nextLoadedPages = new Set(loadedPages);

  const hasReachedLastPage = safeIncomingPageData.length < pageSize;
  if (nextLoadedPages.has(page)) {
    return {
      accumulated: safeAccumulated,
      loadedPages: nextLoadedPages,
      hasReachedLastPage,
    };
  }

  nextLoadedPages.add(page);

  const nextAccumulated =
    page === 1
      ? safeIncomingPageData
      : [...safeAccumulated, ...safeIncomingPageData];

  return {
    accumulated: nextAccumulated,
    loadedPages: nextLoadedPages,
    hasReachedLastPage,
  };
};
