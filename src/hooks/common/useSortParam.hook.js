import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

// Lecture listings sort by edit-time on the server. "desc" = newest first
// (the historical default), "asc" = oldest first (find old lectures).
export const SORT_NEWEST = "desc";
export const SORT_OLDEST = "asc";

/**
 * URL-backed sort state shared by lecturer / category / search listings.
 * Persists to `?sort=` so deep links and refreshes keep the chosen order.
 * Returns [sort, setSort] where sort is always "asc" | "desc".
 */
export const useSortParam = (defaultSort = SORT_NEWEST) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const raw = searchParams.get("sort");
  const sort = raw === SORT_OLDEST || raw === SORT_NEWEST ? raw : defaultSort;

  const setSort = useCallback(
    (next) => {
      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev);
          if (next === defaultSort) {
            params.delete("sort");
          } else {
            params.set("sort", next);
          }
          return params;
        },
        { replace: true }
      );
    },
    [setSearchParams, defaultSort]
  );

  return [sort, setSort];
};
