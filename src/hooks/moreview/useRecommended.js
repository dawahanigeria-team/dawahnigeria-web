import { useInfiniteQuery } from "@tanstack/react-query";
import { moreViewApi } from "../../services/more.service";
import { extractArrayData } from "../../utils/dataHelpers";

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
    queryFn: async ({ pageParam = 1 }) => {
      const response = await moreViewApi.getRecommended({ page: pageParam, langid });
      return extractArrayData(response);
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
