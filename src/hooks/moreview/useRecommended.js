import { useInfiniteQuery } from "@tanstack/react-query";
import { moreViewApi } from "../../services/more.service";

export const useRecommended = (langid = 6) => {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["recommended", langid],
    queryFn: ({ pageParam = 1 }) =>
      moreViewApi.getRecommended({ page: pageParam, langid }),
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
