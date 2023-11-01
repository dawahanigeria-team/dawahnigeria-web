import { useQuery } from "@tanstack/react-query";
import { quranApi } from "../../services";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export const useQuranAlbums = (page = 1) => {
  const [cummulatedData, setCummulatedData] = useState([]);
  const [isLoadingNextPage, setIsLoadingNextPage] = useState(false);
  const [hasReachedLastPage, setHasReachedLastPage] = useState(false);

  const { isLoading, data, error } = useQuery(
    ["qurans", page],
    () => quranApi.getQuranAlbums(page),
    {
      enabled: !hasReachedLastPage, // don't make request if last page has been loaded
      onSuccess: (data) => {
        setIsLoadingNextPage(false);

        // ensure subsequent requests are not sent when the last one doesn't have data
        if (data?.length === 0) {
          setHasReachedLastPage(true);
          return;
        }

        setCummulatedData((prev) => [...prev, ...data]);
      },
      onError: (error) => {
        setIsLoadingNextPage(false);
        
        toast.error("Unable to load qurans");
      },
    }
  );

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
  };
};
