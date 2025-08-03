import { useQuery } from "@tanstack/react-query";
import { moreViewApi } from "../../services";
import { useEffect, useState } from "react";
import toast from "../../utils/conditionalToast"; // SSR-safe toast utility

export const useMoreViewHook = (keyParam, currentdata) => {
  const [querydata, setquerydata] = useState([]);
  const [isLoadingNextPage, setIsLoadingNextPage] = useState(false);
  const [hasReachedLastPage, setHasReachedLastPage] = useState(false);

  const { data, isLoading, error } = useQuery(
    ["more-view", keyParam],
    () => moreViewApi.moreDatas(keyParam),
    {
      enabled: !!keyParam.endpoint_url && !hasReachedLastPage,
      onSuccess: (data) => {
        setIsLoadingNextPage(false);

        // Ensure data is an array and has content
        const responseData = Array.isArray(data) ? data : [];

        // ensure subsequent requests are not sent when the last one doesn't have data
        if (!responseData || responseData.length === 0) {
          setHasReachedLastPage(true);
          return;
        }

        // Only append new data if it's a subsequent page
        if (keyParam.page === 1) {
          setquerydata(responseData);
        } else {
          setquerydata((prev) => {
            // Ensure prev is an array
            const prevData = Array.isArray(prev) ? prev : [];

            // Filter out duplicates based on nid
            const newData = responseData.filter(
              (item) => !prevData.some((prevItem) => prevItem.nid === item.nid)
            );
            return [...prevData, ...newData];
          });
        }
      },
      onError: (error) => {
        setIsLoadingNextPage(false);
        toast.error("Unable to load data");
      },
    }
  );

  // handles when page changes
  useEffect(() => {
    if (!keyParam.page) return;
    if (keyParam.page !== 1 && !hasReachedLastPage) {
      setIsLoadingNextPage(true);
    }
  }, [keyParam.page]);

  useEffect(() => {
    if (!keyParam.endpoint_url) {
      // Ensure currentdata is an array
      setquerydata(Array.isArray(currentdata) ? currentdata : []);
      setHasReachedLastPage(true);
    } else {
      // Reset state when endpoint changes
      setquerydata([]);
      setHasReachedLastPage(false);
    }
  }, [keyParam.endpoint_url]);

  return {
    data: querydata,
    isLoading,
    error,
    isLoadingNextPage,
    isLastPage: hasReachedLastPage,
  };
};
