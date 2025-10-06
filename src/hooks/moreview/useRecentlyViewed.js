import { useInfiniteQuery } from "@tanstack/react-query";
import { moreViewApi } from "../../services/more.service";

export const useRecentlyViewed = (langid = 6) => {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["recently-viewed", langid],
    queryFn: ({ pageParam = 1 }) => moreViewApi.getRecentlyViewed({ page: pageParam, langid }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) {
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
