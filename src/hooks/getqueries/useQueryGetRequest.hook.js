import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo, useEffect } from "react";
import { toast } from "../../utils/conditionalToast";

/**
 * Optimized pagination hook using useInfiniteQuery
 * Maintains backward compatibility with existing consumers
 */
export const useQueryGetRequest = (keyName, queryParam = {}, queryFunction) => {
  const initialPage = queryParam?.page || 1;

  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: [keyName, { ...queryParam, page: undefined }],
    queryFn: async ({ pageParam = initialPage }) => {
      try {
        const result = await queryFunction({ ...queryParam, page: pageParam });
        // Ensure we never return undefined - React Query requires defined values
        return result ?? [];
      } catch (err) {
        // Return empty array on error to satisfy React Query's requirement
        return [];
      }
    },
    getNextPageParam: (lastPage, allPages) => {
      const dataArray = normalizeData(lastPage);
      if (dataArray.length === 0) return undefined;
      return allPages.length + 1;
    },
    onError: () => {
      toast.error("Unable to load data");
    },
  });

  // Flatten all pages into single array (backward compatible with querieddata)
  const querieddata = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap(normalizeData);
  }, [data?.pages]);

  // Auto-fetch next page when queryParam.page changes
  useEffect(() => {
    const targetPage = queryParam?.page;
    if (typeof targetPage === "number" && targetPage > 1 && hasNextPage && !isFetchingNextPage) {
      const currentPages = data?.pages?.length || 1;
      if (targetPage > currentPages) {
        fetchNextPage();
      }
    }
  }, [queryParam?.page, hasNextPage, data?.pages?.length, fetchNextPage, isFetchingNextPage]);

  return {
    isLoading,
    isLoadingNextPage: isFetchingNextPage,
    isLastPage: !hasNextPage,
    error,
    data: data?.pages?.[data.pages.length - 1],
    querieddata,
    refetch,
    isFetching: isLoading || isFetchingNextPage,
  };
};

// Helper to normalize API responses into arrays
function normalizeData(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  if (response != null) return [response];
  return [];
}
