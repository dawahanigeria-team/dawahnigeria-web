import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import _ from "lodash";
export const useQueryGetRequest = (
  keyName,
  queryParam = {},
  queryFunction
) => {
  const [querieddata, setQueriedData] = useState([]);
  const [isLoadingNextPage, setIsLoadingNextPage] = useState(false);
  const [hasReachedLastPage, setHasReachedLastPage] = useState(false);

  const { isLoading, data, error } = useQuery(
    [keyName, queryParam],
    () => queryFunction(queryParam),
    {
      enabled: !hasReachedLastPage,
      onSuccess: (data) => {
        setIsLoadingNextPage(false);
       
        // ensure subsequent requests are not sent when the last one doesn't have data
        if (data?.length === 0) {
            
          setHasReachedLastPage(true);
          return;
        }

        setQueriedData((prev) => _.uniqBy([...prev, ...data], "nid"));
      },
      onError: (error) => {
        setIsLoadingNextPage(false);
        console.error("error", error);
        toast.error("Unable to load data");
      },
    }
  );

  // handles when page changes
  useEffect(() => {
    
    if (!queryParam.page) return // return if the query param is not page
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
  };
};
