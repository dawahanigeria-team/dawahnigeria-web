import { useInfiniteQuery } from "@tanstack/react-query";
import { moreViewApi } from "../../services";
import { useMemo, useEffect } from "react";
import toast from "../../utils/conditionalToast";

export const useMoreViewHook = (keyParam, currentdata) => {
  const hasEndpoint = !!keyParam.endpoint_url;

  const {
    data,
    isLoading,
    error,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["more-view", keyParam.endpoint_url],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const result = await moreViewApi.moreDatas({ ...keyParam, page: pageParam });
        // Ensure we never return undefined - React Query requires defined values
        return result ?? [];
      } catch (err) {
        return [];
      }
    },
    getNextPageParam: (lastPage, allPages) => {
      const responseData = Array.isArray(lastPage) ? lastPage : [];
      if (responseData.length === 0) return undefined;
      return allPages.length + 1;
    },
    enabled: hasEndpoint,
    onError: () => {
      toast.error("Unable to load data");
    },
  });

  // Flatten pages and deduplicate by nid
  const querydata = useMemo(() => {
    if (!hasEndpoint) {
      return Array.isArray(currentdata) ? currentdata : [];
    }

    if (!data?.pages) return [];

    const seen = new Set();
    return data.pages.flatMap((page) => {
      const pageData = Array.isArray(page) ? page : [];
      return pageData.filter((item) => {
        if (seen.has(item.nid)) return false;
        seen.add(item.nid);
        return true;
      });
    });
  }, [data?.pages, hasEndpoint, currentdata]);

  // Auto-fetch when page changes
  useEffect(() => {
    if (hasEndpoint && keyParam.page > 1 && hasNextPage && !isFetchingNextPage) {
      const currentPages = data?.pages?.length || 1;
      if (keyParam.page > currentPages) {
        fetchNextPage();
      }
    }
  }, [keyParam.page, hasEndpoint, hasNextPage, data?.pages?.length, fetchNextPage, isFetchingNextPage]);

  return {
    data: querydata,
    isLoading,
    error,
    isLoadingNextPage: isFetchingNextPage,
    isLastPage: !hasNextPage || !hasEndpoint,
    isFetching: isLoading || isFetchingNextPage,
  };
};
