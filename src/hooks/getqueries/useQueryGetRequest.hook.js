import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { toast } from "../../utils/conditionalToast"; // SSR-safe toast utility
import _ from "lodash";
export const useQueryGetRequest = (keyName, queryParam = {}, queryFunction) => {
  const [querieddata, setQueriedData] = useState([] || null);
  const [isLoadingNextPage, setIsLoadingNextPage] = useState(false);
  const [hasReachedLastPage, setHasReachedLastPage] = useState(false);

  const { isLoading, data, error, refetch } = useQuery(
    [keyName, queryParam],
    () => queryFunction(queryParam),
    {
      enabled: !hasReachedLastPage,
      onSuccess: (data) => {
        setIsLoadingNextPage(false);

        // Normalize response into an array shape consistently
        const dataArray = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
          ? data.data
          : data != null
          ? [data]
          : [];

        // ensure subsequent requests are not sent when the last one doesn't have data
        if (dataArray.length === 0) {
          setHasReachedLastPage(true);
          return;
        }

        queryParam.page
          ? setQueriedData((prev) => [...prev, ...dataArray])
          : setQueriedData(dataArray);
        
      },
      onError: (error) => {
        setIsLoadingNextPage(false);
        
        toast.error("Unable to load data");
      },
    }
  );

  // handles when page changes
  useEffect(() => {
    if (!queryParam.page) return; // return if the query param is not page
    if (queryParam.page !== 1 && !hasReachedLastPage) {
      setIsLoadingNextPage(true);
    }
  }, [queryParam.page]);

  return {
    isLoading,
    isLoadingNextPage,
    isLastPage: hasReachedLastPage,
    error,
    data,
    querieddata,
    refetch
  };
};
