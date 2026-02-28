import { useQuery } from "@tanstack/react-query";
import { quranApi } from "../../services";
import toast from "../../utils/conditionalToast"; // SSR-safe toast utility
import { useEffect, useRef, useState } from "react";
import { mergeQuranAlbumPage } from "./useQuranAlbums.helpers";

const PAGE_SIZE = 20;

export const useQuranAlbums = (page = 1) => {
  const [cummulatedData, setCummulatedData] = useState([]);
  const [isLoadingNextPage, setIsLoadingNextPage] = useState(false);
  const [hasReachedLastPage, setHasReachedLastPage] = useState(false);
  const loadedPagesRef = useRef(new Set());

  const { isLoading, data, error, isFetching } = useQuery(
    ["qurans", page],
    () => quranApi.getQuranAlbums(page),
    {
      enabled: !hasReachedLastPage,
      keepPreviousData: true,
      onError: () => {
        setIsLoadingNextPage(false);
        toast.error("Unable to load qurans");
      },
    }
  );

  useEffect(() => {
    if (!Array.isArray(data)) return;

    setCummulatedData((prev) => {
      const merged = mergeQuranAlbumPage({
        accumulated: prev,
        incomingPageData: data,
        page,
        loadedPages: loadedPagesRef.current,
        pageSize: PAGE_SIZE,
      });

      loadedPagesRef.current = merged.loadedPages;
      setHasReachedLastPage((prevHasReachedLastPage) => {
        return prevHasReachedLastPage || merged.hasReachedLastPage;
      });

      return merged.accumulated;
    });
    setIsLoadingNextPage(false);
  }, [data, page]);

  // handles when page changes
  useEffect(() => {
    if (page !== 1 && !hasReachedLastPage) {
      setIsLoadingNextPage(true);
    }
  }, [page]);

  return {
    isLoading,
    isLoadingNextPage,
    isLastPage: hasReachedLastPage,
    error,
    data,
    cummulatedData,
    isFetching,
  };
};

// export const useQuranAlbumInfiniteQuery = () => {
//   const {
//     data,
//     error,
//     fetchNextPage,
//     hasNextPage,
//     isFetching,
//     isFetchingNextPage,
//     status,
//   } = useInfiniteQuery({
//     queryKey: ["recitations"],
//     queryFn: quranApi.getQuranAlbums,
//     initialPageParam: 1,
//     getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
//   });

//   return {
//     data,
//     error,
//     fetchNextPage,
//     hasNextPage,
//     isFetching,
//     isFetchingNextPage,
//     status,
//   };
// };
