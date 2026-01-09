import { useInfiniteQuery } from "@tanstack/react-query";
import { moreViewApi } from "../../services/more.service";

export const useTrending = (langid = 6) => {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["trending", langid],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await moreViewApi.getTrending({ page: pageParam, langid });
      // Extract data array from response object
      return Array.isArray(response?.data) ? response.data : Array.isArray(response) ? response : [];
    },
    getNextPageParam: (lastPage, pages) => {
      const pageData = Array.isArray(lastPage) ? lastPage : [];
      if (pageData.length === 0) {
        return undefined;
      }
      return pages.length + 1;
    },
  });

  return {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  };
};
